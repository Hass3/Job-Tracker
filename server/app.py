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
        if not user or not user.authenticate(password):
            return {"error": "Invaild username or passsword"}, 401
        
        login_user(user,remember=True)
        db.session.add(user)
        db.session.commit()
        user_dict = {
            'id': user.id,
            'name': user.name,
            'username': user.username,
             'applications': [
                    {
                        'id': a.id,
                        'status': a.status,
                        'application_date': a.application_date,
                        'notes': a.notes,
                        'job': {
                            'id': a.job.id,
                            'title': a.job.title,
                            'salary':a.job.salary,
                            'description':a.job.description,
                            'location':a.job.location,
                            'company_name':a.job.company.name,
                        }
                    }
                    for a in current_user.applications if a.user_id == current_user.id
                ]
            }
        return user_dict, 200
    

class SignUp(Resource):
    def post(self):
       

        name = request.get_json()['name']
        username = request.get_json()['username']
        password = request.get_json()['password']
        exsiting_user = User.query.filter_by(username=username).first()
        if exsiting_user:
            return{'error':'username is already taken'}, 400
        
        user = User(name=name,username=username)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        user_dict = {
                'id': user.id,
                'name': user.name,
                'username': user.username,
                'applications': [
                    {
                        'id': a.id,
                        'status': a.status,
                        'application_date': a.application_date,
                        'notes': a.notes,
                        'job': {
                             'id': a.job.id,
                            'title': a.job.title,
                            'salary':a.job.salary,
                            'description':a.job.description,
                            'location':a.job.location,
                            'company_name':a.job.company.name,
                        }
                    }
                    for a in current_user.applications if a.user_id == current_user.id
                ]
            }
        return user_dict,201


class Logout(Resource):
    @login_required
    def post(self):
        logout_user()
        return {}, 200

class CurrentUser(Resource):
    @login_required
    def get(self):
        if current_user.is_authenticated:
            user_dict = {
                'id': current_user.id,
                'name': current_user.name,
                'username': current_user.username,
                'applications': [
                    {
                        'id': a.id,
                        'status': a.status,
                        'application_date': a.application_date,
                        'notes': a.notes,
                        'job': {
                          'id': a.job.id,
                            'title': a.job.title,
                            'salary':a.job.salary,
                            'description':a.job.description,
                            'location':a.job.location,
                            'company_name':a.job.company.name,
                        }
                    }
                    for a in current_user.applications
                ]
            }
            return user_dict, 200
        else:
            return {'Error': 'User Not Found'}, 400
        
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
        try:
            new_company = Company(name=request.get_json()['name'],logo=request.get_json()['logo'],head_quarters= request.get_json()['head_quarters'],description = request.get_json()['description'])
            db.session.add(new_company)
            db.session.commit()
            new_company_dict = {
                'id': new_company.id,
                'name' : new_company.name,
                'logo': new_company.logo,
                'head_quarters': new_company.head_quarters,
                'description':  new_company.description
            }
            return new_company_dict, 201
        except:
            return {"Error": "Unsuccsusful"}, 401

    

class Jobs(Resource):
    @login_required
    def get(self):
        jobs = Job.query.all()
        return [j.to_dict() for j in jobs], 200
    
    @login_required
    def post(self):
        try:
            new_job = Job(title=request.get_json()['title'], description=request.get_json()['description'], location=request.get_json()['location'], salary=int(request.get_json()['salary']) ,company_id = int(request.get_json()['company_id']))
            db.session.add(new_job)
            db.session.commit()
            return new_job.to_dict(), 201
        except: 
            return {"Error": "Unsuccsusful"}, 401


class Applications(Resource):
    @login_required
    def post(self):
        new_application = Application(application_date = request.get_json()['application_date'],status = request.get_json()['status'],notes = request.get_json()['notes'],job_id = int(request.get_json()['job_id']),  user_id = int(request.get_json()['user_id']))
        db.session.add(new_application)
        db.session.commit()
        new_application_dict = {
                        'id': new_application.id,
                        'status': new_application.status,
                        'application_date': new_application.application_date,
                        'notes': new_application.notes,
                        'job': {
                            'id': new_application.job.id,
                            'title': new_application.job.title,
                            'salary':new_application.job.salary,
                            'description':new_application.job.description,
                            'location':new_application.job.location,
                            'company_name':new_application.job.company.name
                        }
                    }
               
        return new_application_dict, 201

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
        
class ApplicationById(Resource):
    @login_required
    def delete(self,id):
        application = [a for a in current_user.applications if a.id == id][0]
        db.session.delete(application) 
        db.session.commit()
        return {},204 
    
    @login_required
    def get(self,id):
        application = None
        for a in current_user.applications:
            if a.id == id:
                application = {
                    'id': a.id,
                    'status': a.status,
                    'application_date': a.application_date,
                    'notes': a.notes,
                    'job': {
                        'id': a.job.id,
                        'title': a.job.title,
                        'salary':a.job.salary,
                        'description':a.job.description,
                        'location':a.job.location,
                        'company_name':a.job.company.name
                        }
                    }
        return application, 200
    
    @login_required
    def patch(self,id):
        application = [a for a in current_user.applications if a.id == id][0]
        for attr in request.get_json():
            setattr(application,attr,request.get_json()[attr])
        db.session.add(application)
        db.session.commit()
        application_dict = {
                'id': application.id,
                'status': application.status,
                'application_date': application.application_date,
                'notes': application.notes,
                'job': {
                    'id': application.job.id,
                    'title': application.job.title,
                    'salary':application.job.salary,
                    'description':application.job.description,
                    'location':application.job.location,
                    'company_name':application.job.company.name
                    }
                }
        return application_dict, 201
        

api.add_resource(Login, '/login')
api.add_resource(SignUp, '/signup')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentUser, '/current_user')
api.add_resource(Companies, '/companies')
api.add_resource(Jobs, '/jobs')
api.add_resource(Applications,'/applications')
api.add_resource(CompanyById, '/companies/<int:id>')
api.add_resource(JobById, '/jobs/<int:id>')
api.add_resource(ApplicationById,'/applications/<int:id>')

if __name__ == '__main__':
    app.run(port=5555,debug=True)