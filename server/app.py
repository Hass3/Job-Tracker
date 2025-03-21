from config import api,app,db, login_manager
from models import *
from flask import request
from flask_restful import Resource
from flask_login import login_user, login_required, logout_user, current_user

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            login_user(user,remember=True)
            db.session.add(user)
            db.session.commit()
            user_dict = {
                'name': user.name,
                'username': user.username
            }
            return user_dict, 200
        else:
            return {"Error": "Not Found"}, 404
    

class SignUp(Resource):
    def post(self):
        name = request.get_json()['name']
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User(name=name,username=username)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        user_dict = {
                'name': user.name,
                'username': user.username
            }
        return user_dict,201


class Logout(Resource):
    @login_required
    def post(self):
        logout_user()
        return {}, 200

class CurrentUser(Resource):
    def get(self):
        if current_user.is_authenticated:
            user_dict = {
                'name': current_user.name,
                'username': current_user.username
            }
            return user_dict, 200
        else:
            return {'not': 'Found'}, 400
        
class Companies(Resource):
    @login_required
    def get(self):
        companies = Company.query.all()
        companies_dict = []
        for c in companies:
            c_dict = {
                'id': c.id,
                'name' : c.name,
                'logo': c.logo,
                'head_quarters': c.head_quarters,
                'description': c.description
            }
            companies_dict.append(c_dict)
        return companies_dict, 200

    
    
    @login_required
    def post(self):
        new_company = Company(name = request.get_json()['name'], logo = request.get_json()['logo'], location = request.get_json()['location'], description = request.get_json()['description'])
        db.session.add(new_company)
        db.session.commit()
        return new_company.to_dict(), 201
    

class Jobs(Resource):
    @login_required
    def get(self):
        jobs = Jobs.query.all()
        return [j.to_dict() for j in jobs], 200
    
    @login_required
    def post(self):
        new_job = Job(title = request.get_json()['title'], description = request.get_json()['description'], salary = request.get_json()['salary'])
        db.session.add(new_job)
        db.session.commit()
        return new_job.to_dict(), 201

class Applications(Resource):

    @login_required
    def post(self):
        new_application = Application(user_id = request.get_json()['user_id'], job_id = request.get_json()['job_id'], application_date = request.get_json()['application_date'], status = request.get_json()['status'])
        db.session.add(new_application)
        db.session.commit()
        return new_application.to_dict(), 201

class CompanyById(Resource):
    @login_required
    def get(self, id):
        company = Company.query.filter_by(id=id).first()
        company_dict = {
            'id': company.id,
            'name' : company.name,
            'logo': company.logo,
            'head_quarters': company.head_quarters,
            'description': company.description,
            'jobs': [job.to_dict() for job in company.jobs]
        }
        return company_dict, 200


class JobById(Resource):
    @login_required
    def get(self, id):
        job = Job.query.filter_by(id=id).first()
        return job.to_dict(), 200


api.add_resource(Login, '/login')
api.add_resource(SignUp, '/signup')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentUser, '/current_user')
api.add_resource(Companies, '/companies')
api.add_resource(Jobs, '/jobs')
api.add_resource(Applications,'/applications')
api.add_resource(CompanyById, '/companies/<int:id>')
api.add_resource(JobById, '/jobs/<int:id>')

if __name__ == '__main__':
    app.run(port=5555,debug=True)