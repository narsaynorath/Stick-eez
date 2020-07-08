from flask import flash
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource, fields, marshal_with, reqparse

from app import db, models


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

    # @auth.login_required
    @jwt_required
    @marshal_with(resource_fields)
    def get(self):
        user = models.User.query.filter_by(username=get_jwt_identity()).first()
        notes = models.Note.query.filter_by(author=user.id)
        return [NoteDao(n.id, n.author, n.title, n.text) for n in notes]

    # @auth.login_required
    @jwt_required
    @marshal_with(resource_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', required=True)
        parser.add_argument('text')
        args = parser.parse_args()

        user = models.User.query.filter_by(username=get_jwt_identity()).first()
        new_note = models.Note(author=user.id)
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

    @jwt_required
    @marshal_with(resource_fields)
    def get(self, id):
        return models.Note.query.filter_by(id=id).first()  # TODO: Handle resource not found && get by??

    # @auth.login_required
    @jwt_required
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

    # @auth.login_required
    @jwt_required
    @marshal_with(resource_fields)
    def delete(self, id):
        note = models.Note.query.filter_by(id=id).first()
        db.session.delete(note)
        db.session.commit()
        # TODO: What do you return on delete?
        return note
