from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from flask_login import UserMixin
from sqlalchemy.orm import validates


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id =  db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    applications= db.relationship('Application', back_populates = 'user', cascade='all,delete-orphan', overlaps = 'user')
    jobs = db.relationship('Job', secondary = 'applications', back_populates = 'users',overlaps="applications")
    
    serialize_rules = ('-applications.user', '-jobs.users')

    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    

class Company(db.Model, SerializerMixin):
    __tablename__  = 'companies'
    

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String,nullable = False)
    logo = db.Column(db.String,nullable = False)       
    head_quarters = db.Column(db.String,nullable = False)             
    description = db.Column(db.String,nullable = False)
     
    jobs = db.relationship('Job', back_populates = 'company', cascade = 'all,delete-orphan')
    
   

class Job(db.Model, SerializerMixin):
    __tablename__  = 'jobs'
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String,nullable = False)
    description = db.Column(db.String,nullable = False)
    location = db.Column(db.String,nullable = False)
    salary = db.Column(db.Integer,nullable = False)
    company_id = db.Column(db.Integer,db.ForeignKey("companies.id")) 

    serialize_only =('id', 'title', 'description', 'location', 'salary', 'company_id', 'applications')
    serialize_rules = ('-applications.jobs', '-users.jobs')

    applications= db.relationship('Application', back_populates = 'job', cascade='all,delete-orphan', overlaps = 'job',passive_deletes=True )
    users = db.relationship('User', secondary = 'applications', back_populates = 'jobs', overlaps="applications")
    company = db.relationship('Company', back_populates = 'jobs' )



class Application(db.Model, SerializerMixin):
    __tablename__  = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    application_date = db.Column(db.String)
    status = db.Column(db.String,nullable = False)
    notes = db.Column(db.String)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    
    
    serialize_only = ('id', 'application_date','status','notes','job_id','user_id')

    user = db.relationship('User', back_populates = 'applications', overlaps="jobs,users")
    job = db.relationship('Job', back_populates = 'applications',overlaps="jobs, users")