from models import * 
from config import app,db

with app.app_context():

    db.drop_all()
    db.create_all()
    
    companies = [
        Company(name= "google",
                logo ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_FPg0lX5pQ8qRKRXtpN_GcjsxKT2GSlT6NWj9DVWQGGNrke9_4llZj1CGFea2VNKBUc&usqp=CAU", 
                head_quarters = 'Mountain View, California', 
                description = 'A global tech company.' ),
        Company(
                name="Amazon",
                logo="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                head_quarters = ' Seattle, Washington',
                description="E-commerce and cloud computing giant."
        )
    ]

    db.session.add_all(companies)
    db.session.commit()


    jobs = [
        Job(title="Software Engineer", salary=120000, description="Develop and maintain software.",location = 'remote' ,company_id=1),
        Job(title="Data Analyst", salary=90000, description="Analyze and interpret complex data.",location = 'Atlanta, GA.' ,company_id=2)
    ]

    db.session.add_all(jobs)
    db.session.commit()

    users = [
        User(name = 'John Doe', username="john_doe12"),
        User(name = 'Jane Smith', username="jane_smith311")
    ]

    users[0].password_hash = 'helloworld'
    users[1].password_hash = '1234'

    db.session.add_all(users)
    db.session.commit()

    applications = [
        Application(user_id = 1, job_id = 1,  application_date="2025-03-17", status="Applied"),
        Application(user_id=2, job_id=2, application_date="2025-03-18", status="Interview Scheduled")
    ]

    db.session.add_all(applications)
    db.session.commit()
    
    print("Succsesfully seeded")
