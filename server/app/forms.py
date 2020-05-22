from flask_wtf import FlaskForm
from wtforms import BooleanField, PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    title = StringField("Title")
    text = StringField("Text")
    submit = SubmitField("Submit")


class LoginForm(FlaskForm):
    username = StringField("Username")
    password = PasswordField("Password")
    remember_me = BooleanField("Remember Me")
    submit = SubmitField("Submit")
