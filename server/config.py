import os
basedir = os.path.abspath(os.path.dirname(__file__))

db_user = os.environ.get("POSTGRES_USER", "user")
db_pwd = os.environ.get("POSTGRES_PASSWORD", "password")
db_host = os.environ.get("POSTGRES_HOST", "localhost")
db_database = os.environ.get("POSTGRES_DB", "develop")
db_port = os.environ.get("POSTGRES_PORT", "5432")

DATABASE_CONNECTION_URI = f"postgresql+psycopg2://{db_user}:{db_pwd}@{db_host}:{db_port}/{db_database}"

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'development'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or DATABASE_CONNECTION_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
