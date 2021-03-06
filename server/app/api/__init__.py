from flask import g

from app import api_manager, auth
from app.models import User

from .notes import Note, Notes
from .authentication import Auth

api_manager.add_resource(Notes, '/api/v1/notes/')
api_manager.add_resource(Note, '/api/v1/notes/<int:id>/')
api_manager.add_resource(Auth, '/api/v1/login/')


@auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return False
    g.user = user
    return True
