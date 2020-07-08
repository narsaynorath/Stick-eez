from flask_jwt_extended import create_access_token
from flask_restful import fields, marshal_with, Resource, reqparse

from app.models import User


class Auth(Resource):
    resource_fields = {
        'access_token': fields.String,
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
        if user.verify_password(password):
            access_token = create_access_token(identity=username)
            return {'access_token': access_token}
