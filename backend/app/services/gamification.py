from __future__ import annotations

from collections import defaultdict
from datetime import date, datetime, timedelta

from sqlalchemy import func

from ..extensions import db
from ..models import Activity, BadgeProgress


BADGE_DEFINITIONS = [
    {
        "key": "first_move",
        "name": "First Move",
        "description": "Log your first activity.",
        "icon": "Sparkles",
        "threshold": 1,
        "metric": "activities",
    },
    {
        "key": "cardio_starter",
        "name": "Cardio Starter",
        "description": "Complete 150 minutes of workouts.",
        "icon": "HeartPulse",
        "threshold": 150,
        "metric": "minutes",
    },
    {
        "key": "calorie_crusher",
        "name": "Calorie Crusher",
        "description": "Burn 2,000 calories.",
        "icon": "Flame",
        "threshold": 2000,
        "metric": "calories",
    },
    {
        "key": "step_master",
        "name": "Step Master",
        "description": "Hit 50,000 total steps.",
        "icon": "Footprints",
        "threshold": 50000,
        "metric": "steps",
    },
    {
        "key": "consistency_king",
        "name": "Consistency King",
        "description": "Maintain a 7-day streak.",
        "icon": "Crown",
        "threshold": 7,
        "metric": "streak",
    },
]


ACTIVITY_POINTS = {
    "walking": 8,
    "running": 15,
    "cycling": 13,
    "yoga": 10,
    "strength": 14,
    "swimming": 16,
    "hiit": 18,
    "meditation": 6,
}


DAILY_CHALLENGES = [
    {
        "key": "daily_move",
        "title": "Daily Move",
        "description": "Log at least one activity today.",
        "metric": "activities",
        "target": 1,
        "reward": 40,
        "accent": "sky",
    },
    {
        "key": "daily_burn",
        "title": "Calorie Burn",
        "description": "Burn 350 calories today.",
        "metric": "calories",
        "target": 350,
        "reward": 60,
        "accent": "rose",
    },
]


WEEKLY_CHALLENGES = [
    {
        "key": "weekly_minutes",
        "title": "Weekly Consistency",
        "description": "Reach 180 workout minutes this week.",
        "metric": "minutes",
        "target": 180,
        "reward": 120,
        "accent": "violet",
    },
    {
        "key": "weekly_steps",
        "title": "Step Surge",
        "description": "Hit 45,000 steps this week.",
        "metric": "steps",
        "target": 45000,
        "reward": 160,
        "accent": "emerald",
    },
]


def _get_progress_totals(user_id: int) -> dict:
    totals = (
        db.session.query(
            func.count(Activity.id),
            func.coalesce(func.sum(Activity.duration_minutes), 0),
            func.coalesce(func.sum(Activity.calories), 0),
            func.coalesce(func.sum(Activity.steps), 0),
        )
        .filter(Activity.user_id == user_id)
        .one()
    )
    return {
        "activities": int(totals[0] or 0),
        "minutes": int(totals[1] or 0),
        "calories": int(totals[2] or 0),
        "steps": int(totals[3] or 0),
    }


def calculate_points_for_activity(activity: Activity) -> int:
    base = ACTIVITY_POINTS.get(activity.activity_type.lower(), 10)
    intensity_bonus = {"light": 2, "moderate": 5, "intense": 9}.get(activity.intensity, 4)
    return base + activity.duration_minutes + int(activity.distance_km * 4) + intensity_bonus


def calculate_streak(dates: list[date]) -> int:
    if not dates:
        return 0

    unique_dates = sorted(set(dates), reverse=True)
    today = date.today()
    start_anchor = today if unique_dates[0] == today else today - timedelta(days=1)
    if unique_dates[0] < start_anchor:
        return 0

    streak = 0
    current = start_anchor
    available = set(unique_dates)
    while current in available:
        streak += 1
        current -= timedelta(days=1)
    return streak


def ensure_badges(user_id: int) -> list[dict]:
    totals = _get_progress_totals(user_id)
    streak = calculate_streak(
        [row[0] for row in db.session.query(Activity.activity_date).filter_by(user_id=user_id).all()]
    )
    totals["streak"] = streak

    existing = {
        badge.badge_key: badge
        for badge in BadgeProgress.query.filter_by(user_id=user_id).all()
    }

    badge_cards = []
    changed = False
    for definition in BADGE_DEFINITIONS:
        progress = totals.get(definition["metric"], 0)
        unlocked = progress >= definition["threshold"]
        badge_record = existing.get(definition["key"])
        if badge_record is None:
            badge_record = BadgeProgress(
                user_id=user_id,
                badge_key=definition["key"],
                unlocked=unlocked,
                unlocked_at=datetime.utcnow() if unlocked else None,
            )
            db.session.add(badge_record)
            changed = True
        elif unlocked and not badge_record.unlocked:
            badge_record.unlocked = True
            badge_record.unlocked_at = datetime.utcnow()
            changed = True

        badge_cards.append(
            {
                **definition,
                "progress": progress,
                "unlocked": unlocked,
                "remaining": max(definition["threshold"] - progress, 0),
            }
        )

    if changed:
        db.session.commit()

    return badge_cards


def weekly_activity(user_id: int) -> list[dict]:
    today = date.today()
    days = [today - timedelta(days=offset) for offset in range(6, -1, -1)]
    grouped = defaultdict(lambda: {"steps": 0, "calories": 0, "minutes": 0, "points": 0})

    activities = Activity.query.filter(
        Activity.user_id == user_id,
        Activity.activity_date >= days[0],
        Activity.activity_date <= days[-1],
    ).all()

    for activity in activities:
        bucket = grouped[activity.activity_date.isoformat()]
        bucket["steps"] += activity.steps
        bucket["calories"] += activity.calories
        bucket["minutes"] += activity.duration_minutes
        bucket["points"] += calculate_points_for_activity(activity)

    return [
        {
            "date": day.isoformat(),
            "label": day.strftime("%a"),
            **grouped[day.isoformat()],
        }
        for day in days
    ]


def _challenge_progress(challenge: dict, totals: dict) -> dict:
    current = int(totals.get(challenge["metric"], 0))
    progress = min(round((current / challenge["target"]) * 100), 100)
    return {
        **challenge,
        "current": current,
        "progress": progress,
        "completed": current >= challenge["target"],
        "remaining": max(challenge["target"] - current, 0),
    }


def build_challenges(user_id: int) -> dict:
    today = date.today()
    week_start = today - timedelta(days=6)

    daily_rows = Activity.query.filter(
        Activity.user_id == user_id,
        Activity.activity_date == today,
    ).all()
    weekly_rows = Activity.query.filter(
        Activity.user_id == user_id,
        Activity.activity_date >= week_start,
        Activity.activity_date <= today,
    ).all()

    daily_totals = {
        "activities": len(daily_rows),
        "minutes": sum(activity.duration_minutes for activity in daily_rows),
        "calories": sum(activity.calories for activity in daily_rows),
        "steps": sum(activity.steps for activity in daily_rows),
    }
    weekly_totals = {
        "activities": len(weekly_rows),
        "minutes": sum(activity.duration_minutes for activity in weekly_rows),
        "calories": sum(activity.calories for activity in weekly_rows),
        "steps": sum(activity.steps for activity in weekly_rows),
    }

    daily = [_challenge_progress(challenge, daily_totals) for challenge in DAILY_CHALLENGES]
    weekly = [_challenge_progress(challenge, weekly_totals) for challenge in WEEKLY_CHALLENGES]
    challenge_bonus = sum(
        challenge["reward"]
        for challenge in daily + weekly
        if challenge["completed"]
    )

    return {
        "daily": daily,
        "weekly": weekly,
        "completedCount": sum(1 for challenge in daily + weekly if challenge["completed"]),
        "totalCount": len(daily) + len(weekly),
        "bonusPoints": challenge_bonus,
    }


def build_level(total_points: int) -> dict:
    level = max(1, (total_points // 250) + 1)
    level_floor = (level - 1) * 250
    next_level_at = level * 250
    current_xp = total_points - level_floor
    needed = next_level_at - level_floor
    progress = min(round((current_xp / needed) * 100), 100)
    return {
        "currentLevel": level,
        "currentXp": current_xp,
        "xpForNextLevel": needed,
        "nextLevelAt": next_level_at,
        "progress": progress,
    }


def build_stats(user) -> dict:
    activities = user.activities
    totals = _get_progress_totals(user.id)
    total_points = sum(calculate_points_for_activity(activity) for activity in activities)
    challenges = build_challenges(user.id)
    total_points += challenges["bonusPoints"]
    streak = calculate_streak([activity.activity_date for activity in activities])
    badges = ensure_badges(user.id)
    weekly = weekly_activity(user.id)
    level = build_level(total_points)

    goals = {
        "steps": {"current": totals["steps"], "target": 70000},
        "calories": {"current": totals["calories"], "target": 3500},
        "minutes": {"current": totals["minutes"], "target": 300},
    }

    completion = {
        key: min(round((value["current"] / value["target"]) * 100), 100)
        for key, value in goals.items()
    }

    message = (
        "Momentum looks great. Keep the streak alive with one more session today."
        if streak >= 3
        else "Every session compounds. A short workout today keeps your rhythm strong."
    )

    return {
        "summary": {
            "steps": totals["steps"],
            "calories": totals["calories"],
            "workoutMinutes": totals["minutes"],
            "points": total_points,
            "streak": streak,
            "activitiesLogged": totals["activities"],
        },
        "goals": goals,
        "completion": completion,
        "weekly": weekly,
        "badges": badges,
        "challenges": challenges,
        "level": level,
        "message": message,
    }


def leaderboard() -> list[dict]:
    users = db.session.query(
        Activity.user_id,
        func.coalesce(func.sum(Activity.duration_minutes), 0).label("minutes"),
        func.coalesce(func.sum(Activity.steps), 0).label("steps"),
        func.coalesce(func.sum(Activity.calories), 0).label("calories"),
    ).group_by(Activity.user_id).all()

    from ..models import User

    user_lookup = {user.id: user for user in User.query.all()}
    ranked = []
    for row in users:
        user = user_lookup.get(row.user_id)
        if not user:
            continue
        points = int(row.minutes + (row.steps / 120) + (row.calories / 8))
        ranked.append(
            {
                "userId": user.id,
                "name": user.full_name,
                "email": user.email,
                "avatar": user.full_name[:1].upper(),
                "points": int(points),
                "minutes": int(row.minutes),
                "steps": int(row.steps),
            }
        )

    ranked.sort(key=lambda item: item["points"], reverse=True)
    for index, item in enumerate(ranked, start=1):
        item["rank"] = index
    return ranked[:10]
