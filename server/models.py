from sqlalchemy_serializer import SerializerMixin
from config import db
import flask_login


class User(db, SerializerMixin):
    __tablename__ = 'users'

    id =  db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    applications= db.relationship()
    jobs = db.relationship()


class Company(db, SerializerMixin):
    __tablename__ = 'companies'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    logo = db.Column(db.String)
    location = db.Column(db.String)
    description = db.Column(db.String)

    jobs = db.relationship()

class Job(db, SerializerMixin):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    salary = db.Column(db.Integer)
    company_id = db.Column(db.Integer,db.ForeignKey("companies.id")) 

    applications = db.relationship()
    users = db.relationship()


class Application(db, SerializerMixin):
    __tablename__ = 'applications'

    id = db.Column(db.Integer)
    appliction_date = db.Column(db.String)
    status = db.Column(db.String)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))

    user = db.relationship()
    job = db.relationship()

