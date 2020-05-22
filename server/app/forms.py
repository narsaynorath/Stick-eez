from flask_wtf import FlaskForm
from wtforms import BooleanField, StringField, SubmitField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    author = StringField("Author")
    title = StringField("Title")
    text = StringField("Text")
    submit = SubmitField("Submit")


class LoginForm(FlaskForm):
    username = StringField("Username")
    password = StringField("Password")
    remember_me = BooleanField("Remember Me")
    submit = SubmitField("Submit")
