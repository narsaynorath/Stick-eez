from flask import flash, g, redirect, render_template, url_for
from flask_login import current_user, login_user, logout_user
from flask_restful import Resource, fields, marshal_with, reqparse

from app import api_manager, app, auth, db, models


class NoteDao:
    def __init__(self, id, author, title, text):
        self.id = id
        self.author = author
        self.title = title
        self.text = text


class Notes(Resource):

    resource_fields = {
        'id': fields.Integer,
        'author': fields.Integer,
        'title': fields.String,
        'text': fields.String
    }

    @auth.login_required
    @marshal_with(resource_fields)
    def get(self):
        notes = models.Note.query.filter_by(author=g.user.id)
        return [NoteDao(n.id, n.author, n.title, n.text) for n in notes]

    @auth.login_required
    @marshal_with(resource_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', required=True)
        parser.add_argument('text')
        args = parser.parse_args()

        new_note = models.Note(author=g.user.id)
        new_note.text = args.get('text', '')
        new_note.title = args.get('title', '')
        db.session.add(new_note)
        db.session.commit()
        return new_note


class Note(Resource):

    resource_fields = {
        'id': fields.Integer,
        'author': fields.Integer,
        'title': fields.String,
        'text': fields.String
    }

    @auth.login_required
    @marshal_with(resource_fields)
    def get(self, id):
        return models.Note.query.filter_by(id=id).first() # TODO: Handle resource not found && get by??

    @auth.login_required
    @marshal_with(resource_fields)
    def patch(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('text')
        parser.add_argument('title')
        args = parser.parse_args()

        note = models.Note.query.filter_by(id=id).first()
        note.text = args.get('text', note.text)
        note.title = args.get('title', note.title)
        db.session.add(note)
        db.session.commit()
        return note

    @auth.login_required
    @marshal_with(resource_fields)
    def delete(self, id):
        note = models.Note.query.filter_by(id=id).first()
        db.session.delete(note)
        db.session.commit()
        # TODO: What do you return on delete?
        return note
