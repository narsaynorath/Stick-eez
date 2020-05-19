from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    author = StringField("Author")
    title = StringField("Title")
    text = StringField("Text")
    submit = SubmitField("Submit")
