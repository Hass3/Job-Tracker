from config import api,app,db
from models import *
from flask import request
from flask_restful import Resource
from flask_login import login_user, login_required, logout_user, current_user

class Login(Resource):
    def post(self):
        username = request.get_json(['username'])
        password = request.get_json(['password'])

        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            login_user(user,remember=True)
            return user.to_dict(rules = '-_password_hash' ), 200

class SignUp(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User(username=username)
        user.password_hash = password
        db.session.add()
        db.session.commit()
        login_user(user, remember=True)
        return user.to_dict(rules = '-_password_hash' ),201


class Logout(Resource):
    @login_required
    def post(self):
        logout_user()
        return {}, 200

class CurrentUser(Resource):
    def get(self):
        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            False
        

class Companies(Resource):
    def get(self):
        pass

class Jobs(Resource):
    def get(self):
        pass









api.add_resource(Login, '/login')








if __name__ == '__main__':
    app.run(port=5555,debug=True)