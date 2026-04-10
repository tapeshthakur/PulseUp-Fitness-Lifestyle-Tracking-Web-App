from datetime import timedelta
import os


BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get(
        "SECRET_KEY",
        "pulseup-dev-secret-key-change-me-1234567890",
    )
    JWT_SECRET_KEY = os.environ.get(
        "JWT_SECRET_KEY",
        "pulseup-jwt-secret-key-change-me-1234567890",
    )
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'fitness_lifestyle.db')}",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
    JSON_SORT_KEYS = False
