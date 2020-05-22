from flask import flash, redirect, render_template, url_for
from flask_login import current_user, login_user, logout_user

from app import app, db
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
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            return redirect(url_for("notes_list"))

        flash('Invalid username or password')
        return redirect(url_for('login'))
    return render_template("login_form.html", title="Login", form=form)


@app.route('/logout/')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/notes/')
def notes_list():
    notes = Note.query.filter_by(author=current_user.id)
    return render_template("notes_list.html", title="Notes", notes=notes)


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
