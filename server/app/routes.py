from flask import render_template

from app import app
from app.models import Note


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/notes')
def notes_list():
    notes = Note.query.all()

    return render_template("notes.html", notes=notes)
