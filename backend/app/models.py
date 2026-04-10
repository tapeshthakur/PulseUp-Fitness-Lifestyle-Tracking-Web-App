from datetime import date, datetime

from werkzeug.security import check_password_hash, generate_password_hash

from .extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    theme_preference = db.Column(db.String(16), default="dark", nullable=False)
    onboarding_completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    activities = db.relationship(
        "Activity",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan",
        order_by="desc(Activity.activity_date)",
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False, index=True)
    activity_type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    calories = db.Column(db.Integer, nullable=False, default=0)
    steps = db.Column(db.Integer, nullable=False, default=0)
    distance_km = db.Column(db.Float, nullable=False, default=0.0)
    intensity = db.Column(db.String(20), nullable=False, default="moderate")
    notes = db.Column(db.String(255))
    activity_date = db.Column(db.Date, nullable=False, default=date.today, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class BadgeProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False, index=True)
    badge_key = db.Column(db.String(50), nullable=False)
    unlocked = db.Column(db.Boolean, default=False, nullable=False)
    unlocked_at = db.Column(db.DateTime)

    __table_args__ = (db.UniqueConstraint("user_id", "badge_key", name="uq_user_badge"),)
