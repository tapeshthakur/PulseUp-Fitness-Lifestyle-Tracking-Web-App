from datetime import date, datetime, timedelta

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from ..extensions import db
from ..models import Activity, User
from ..services.gamification import build_stats, leaderboard


api_bp = Blueprint("api", __name__)


def _current_user():
    return User.query.get_or_404(int(get_jwt_identity()))


def _serialize_activity(activity: Activity) -> dict:
    return {
        "id": activity.id,
        "activityType": activity.activity_type,
        "title": activity.title,
        "durationMinutes": activity.duration_minutes,
        "calories": activity.calories,
        "steps": activity.steps,
        "distanceKm": activity.distance_km,
        "intensity": activity.intensity,
        "notes": activity.notes,
        "activityDate": activity.activity_date.isoformat(),
        "createdAt": activity.created_at.isoformat(),
    }


@api_bp.get("/activities")
@jwt_required()
def list_activities():
    user = _current_user()
    scope = request.args.get("scope", "weekly")

    query = Activity.query.filter_by(user_id=user.id)
    today = date.today()
    if scope == "daily":
        query = query.filter(Activity.activity_date == today)
    else:
        query = query.filter(Activity.activity_date >= today - timedelta(days=6))

    activities = query.order_by(Activity.activity_date.desc(), Activity.created_at.desc()).all()
    return jsonify({"activities": [_serialize_activity(activity) for activity in activities]})


@api_bp.post("/activities")
@jwt_required()
def create_activity():
    user = _current_user()
    data = request.get_json() or {}

    title = (data.get("title") or "").strip()
    activity_type = (data.get("activityType") or "").strip().lower()
    duration_minutes = int(data.get("durationMinutes") or 0)
    calories = int(data.get("calories") or 0)
    steps = int(data.get("steps") or 0)
    distance_km = float(data.get("distanceKm") or 0)
    intensity = (data.get("intensity") or "moderate").strip().lower()
    notes = (data.get("notes") or "").strip() or None
    raw_date = data.get("activityDate")

    if not title or not activity_type or duration_minutes <= 0:
        return jsonify({"message": "Title, activity type, and duration are required."}), 400

    try:
        activity_date = (
            datetime.strptime(raw_date, "%Y-%m-%d").date() if raw_date else date.today()
        )
    except ValueError:
        return jsonify({"message": "Activity date must use YYYY-MM-DD format."}), 400

    activity = Activity(
        user_id=user.id,
        title=title,
        activity_type=activity_type,
        duration_minutes=duration_minutes,
        calories=calories,
        steps=steps,
        distance_km=distance_km,
        intensity=intensity,
        notes=notes,
        activity_date=activity_date,
    )
    db.session.add(activity)
    db.session.commit()

    return jsonify({"activity": _serialize_activity(activity), "stats": build_stats(user)}), 201


@api_bp.get("/stats")
@jwt_required()
def stats():
    user = _current_user()
    return jsonify(build_stats(user))


@api_bp.get("/leaderboard")
@jwt_required()
def leaderboard_route():
    return jsonify({"leaders": leaderboard()})


@api_bp.patch("/preferences")
@jwt_required()
def update_preferences():
    user = _current_user()
    data = request.get_json() or {}

    if "themePreference" in data:
        user.theme_preference = data["themePreference"]
    if "onboardingCompleted" in data:
        user.onboarding_completed = bool(data["onboardingCompleted"])

    db.session.commit()
    return jsonify(
        {
            "user": {
                "themePreference": user.theme_preference,
                "onboardingCompleted": user.onboarding_completed,
            }
        }
    )
