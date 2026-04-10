from datetime import date, timedelta

from .extensions import db
from .models import Activity, User


def seed_demo_data():
    if User.query.filter_by(email="demo@pulseup.app").first():
        return

    user = User(
        full_name="Ariana Brooks",
        email="demo@pulseup.app",
        theme_preference="dark",
        onboarding_completed=False,
    )
    user.set_password("demo123")
    db.session.add(user)
    db.session.commit()

    samples = [
        ("Morning Run", "running", 42, 420, 6400, 7.1, "intense"),
        ("Strength Session", "strength", 55, 380, 1800, 0.0, "intense"),
        ("Evening Walk", "walking", 30, 160, 4200, 3.5, "light"),
        ("Mobility Flow", "yoga", 28, 110, 900, 0.0, "moderate"),
        ("Ride Session", "cycling", 48, 360, 2400, 14.3, "moderate"),
    ]

    for index, sample in enumerate(samples):
        title, activity_type, minutes, calories, steps, distance, intensity = sample
        activity = Activity(
            user_id=user.id,
            title=title,
            activity_type=activity_type,
            duration_minutes=minutes,
            calories=calories,
            steps=steps,
            distance_km=distance,
            intensity=intensity,
            notes="Seeded session for onboarding polish.",
            activity_date=date.today() - timedelta(days=index),
        )
        db.session.add(activity)

    db.session.commit()
