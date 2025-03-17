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
        else:
            return {}, 404
        

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
        companies = Companies.query.all()
        return [c.to_dict() for c in companies], 200
    
    def post(self):
        new_company = Company(name = request.get_json()['name'], logo = request.get_json()['logo'], location = request.get_json()['location'], description = request.get_json()['description'])
        db.session.add(new_company)
        db.session.commit()
        return new_company.to_dict(), 201
    

class Jobs(Resource):
    def get(self):
        jobs = Jobs.query.all()
        return [j.to_dict() for j in jobs], 200
    
    def post(self):
        new_job = Job(title = request.get_json()['title'], description = request.get_json()['description'], salary = request.get_json()['salary'])
        db.session.add(new_job)
        db.session.commit()
        return new_job.to_dict(), 201

class Applications(Resource):
    def post(self):
        new_application = Application(user_id = request.get_json()['user_id'], job_id = request.get_json()['job_id'], application_date = request.get_json()['application_date'], status = request.get_json()['status'])
        db.session.add(new_application)
        db.session.commit()
        return new_application.to_dict(), 201


api.add_resource(Login, '/login')
api.add_resource(SignUp, '/signup')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentUser, '/currentuser')
api.add_resource(Companies, '/companies')
api.add_resource(Jobs, '/jobs')
api.add_resource(Applications,'/applications')


if __name__ == '__main__':
    app.run(port=5555,debug=True)