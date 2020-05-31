from flask import flash, g, redirect, render_template, url_for
from flask_login import current_user, login_user, logout_user
from flask_restful import Resource, fields, marshal_with

from app import api_manager, app, auth, db
from app.forms import LoginForm, NoteForm
from app.models import Note, User


@app.route('/')
def home():
    if not current_user.is_authenticated:
        return redirect(url_for("login"))
    return render_template("base.html")


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('notes_list'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.verify_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            return redirect(url_for("notes_list"))

        flash('Invalid username or password')
        return redirect(url_for('login'))
    return render_template("login_form.html", title="Login", form=form)


@app.route('/logout/')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/notes/add/', methods=['GET', 'POST'])
def add_new_note():
    form = NoteForm()
    if form.validate_on_submit():
        flash(f"New note added from {current_user.username}")
        new_note = Note(author=current_user.id, title=form.title.data, text=form.text.data)
        db.session.add(new_note)
        db.session.commit()
        return redirect(url_for("notes_list"))
    return render_template("new_notes_form.html", title="Add Note", form=form)


class NotesDao:
    def __init__(self, author, title, text):
        self.author = author
        self.title = title
        self.text = text

class Notes(Resource):

    resource_fields = {
        'author': fields.Integer,
        'title': fields.String,
        'text': fields.String
    }

    @auth.login_required
    @marshal_with(resource_fields)
    def get(self):
        notes = Note.query.filter_by(author=g.user.id)
        return [NotesDao(n.author, n.title, n.text) for n in notes]
