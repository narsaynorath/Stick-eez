import os

from flask import Flask
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv

from config import Config

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
login = LoginManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)
api_manager = Api(app)
auth = HTTPBasicAuth()
CORS(app)

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET')
jwt = JWTManager(app)

from app import api, models
