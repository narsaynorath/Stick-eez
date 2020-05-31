from flask import Flask
from flask_httpauth import HTTPBasicAuth
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
login = LoginManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)
api_manager = Api(app)
auth = HTTPBasicAuth()

from app import api, models

# @auth.verify_password
# def verify_password(username, password):
#     user = models.User.query.filter_by(username = username).first()
#     if not user or not user.verify_password(password):
#         return False
#     g.user = user
#     return True
