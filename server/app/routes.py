from flask import flash, redirect, render_template, url_for

from app import app, db
from app.forms import NoteForm
from app.models import Note, User


@app.route('/')
def home():
    return render_template("base.html")


@app.route('/notes/')
def notes_list():
    notes = Note.query.all()
    return render_template("notes_list.html", title="Notes", notes=notes)


@app.route('/notes/add/', methods=['GET', 'POST'])
def add_new_note():
    form = NoteForm()
    if form.validate_on_submit():
        flash(f"New note added from {form.author.data}")
        author = User.query.filter(User.username == form.author.data).one()
        new_note = Note(author=author.id, title=form.title.data, text=form.text.data)
        db.session.add(new_note)
        db.session.commit()
        return redirect(url_for("notes_list"))
    return render_template("new_notes_form.html", title="Add Note", form=form)
