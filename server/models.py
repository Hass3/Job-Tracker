from sqlalchemy_serializer import SerializerMixin
from config import db
import flask_login


class User():
    id =  db.Column()
    name = db.Column()
    username = db.Column()
    _password_hash = db.Column()
    
    applications= db.relationship()
    jobs = db.relationship()


class Job():
    id = db.Column ()
    company_id = db.Column() 
    title = db.Column()
    description = db.Column()
    salary = db.Column()

    applications = db.relationship()
    users = db.relationship()

    
class Company():
    id = db.Column()
    name = db.Column()
    logo = db.Column()
    location = db.Column()
    description = db.Column()

    jobs = db.relationship()

class Application():
    id = db.Column()
    appliction_date = db.Column()
    status = db.Column()
    job_id = db.Column()
    user_id = db.Column()

    user = db.relationship()
    job = db.relationship()
    
