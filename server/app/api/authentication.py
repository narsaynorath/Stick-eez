from flask_jwt_extended import create_access_token
from flask_restful import fields, marshal_with, Resource, reqparse

from app.models import User


class Auth(Resource):
    user_fields = {
        'username': fields.String
    }

    resource_fields = {
        'access_token': fields.String,
        'user': fields.Nested(user_fields)
    }

    @marshal_with(resource_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()

        username = args.get('username')
        password = args.get('password')

        user = User.query.filter_by(username=username).first()
        if user and user.verify_password(password):
            access_token = create_access_token(identity=username)
            return {
                'access_token': access_token,
                'user': {
                    'username': username
                }
            }
