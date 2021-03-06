from datetime import datetime

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login


@login.user_loader
def load_user(payload):
    """
    Loader that Flask-Login uses to get a User since it's decoupled from
    knowledge of any database.
    """
    if payload is string:
        return User.query.get(int(id))

    return User.query.get(payload['identity'])

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(80), nullable=False, server_default="", default="")
    text = db.Column(db.Text, nullable=False, server_default="", default="")

    def __str__(self):
        return f"Note {self.id}: {self.text}"

    def __repr__(self):
        return str(self)
