from models import * 
from config import app, db

with app.app_context():

    db.drop_all()
    db.create_all()

    companies = [
        Company(name="Google",
                logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_FPg0lX5pQ8qRKRXtpN_GcjsxKT2GSlT6NWj9DVWQGGNrke9_4llZj1CGFea2VNKBUc&usqp=CAU", 
                head_quarters="Mountain View, California", 
                description="A global tech company."),

        Company(name="Amazon",
                logo="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                head_quarters="Seattle, Washington",
                description="E-commerce and cloud computing giant."),

        Company(name="Microsoft",
                logo="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                head_quarters="Redmond, Washington",
                description="Technology and software corporation."),

        Company(name="Tesla",
                logo="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
                head_quarters="Palo Alto, California",
                description="Electric vehicles and clean energy company."),

        Company(name="Netflix",
                logo="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
                head_quarters="Los Gatos, California",
                description="Streaming and entertainment company.")
    ]

    db.session.add_all(companies)
    db.session.commit()

    jobs = [
        Job(title="Software Engineer", salary=120000, description="Develop and maintain software.", location="Remote", company_id=1),
        Job(title="Data Analyst", salary=90000, description="Analyze and interpret complex data.", location="Atlanta, GA", company_id=2),
        Job(title="Cloud Architect", salary=150000, description="Design cloud infrastructure.", location="New York, NY", company_id=3),
        Job(title="AI Researcher", salary=160000, description="Develop and train AI models.", location="San Francisco, CA", company_id=1),
        Job(title="Cybersecurity Specialist", salary=110000, description="Protect digital assets and data.", location="Remote", company_id=3),
        Job(title="Product Manager", salary=130000, description="Lead the development of new products.", location="Seattle, WA", company_id=2),
        Job(title="Mechanical Engineer", salary=95000, description="Design and improve mechanical systems.", location="Austin, TX", company_id=4),
        Job(title="Marketing Specialist", salary=85000, description="Plan and execute marketing campaigns.", location="Los Angeles, CA", company_id=5),
        Job(title="Backend Developer", salary=115000, description="Develop server-side applications.", location="Boston, MA", company_id=3),
        Job(title="UX/UI Designer", salary=105000, description="Improve user experience and interface.", location="San Francisco, CA", company_id=5)
    ]

    db.session.add_all(jobs)
    db.session.commit()

    users = [
        User(name="John Doe", username="john_doe12"),
        User(name="Jane Smith", username="jane_smith311"),
        User(name="Alice Johnson", username="alice_j_92"),
        User(name="Michael Brown", username="michael_brown88"),
        User(name="Emily Davis", username="emily_d_77")
    ]

    users[0].password_hash = 'helloworld'
    users[1].password_hash = '1234'
    users[2].password_hash = 'securepass'
    users[3].password_hash = 'testpassword'
    users[4].password_hash = 'pass123'

    db.session.add_all(users)
    db.session.commit()

    applications = [
        Application(user_id=1, job_id=1, application_date="2025-03-17", status="Applied", notes="Excited for this role!"),
        Application(user_id=2, job_id=2, application_date="2025-03-18", status="Interview Scheduled", notes="Looking forward to the interview."),
        Application(user_id=3, job_id=3, application_date="2025-03-19", status="Rejected", notes="Received feedback."),
        Application(user_id=4, job_id=4, application_date="2025-03-20", status="Offer Received", notes="Considering the offer."),
        Application(user_id=5, job_id=5, application_date="2025-03-21", status="Applied", notes="Submitted application."),
        Application(user_id=1, job_id=6, application_date="2025-03-22", status="Pending", notes="Waiting for response."),
        Application(user_id=2, job_id=7, application_date="2025-03-23", status="Applied", notes="First application to Tesla!"),
        Application(user_id=3, job_id=8, application_date="2025-03-24", status="Interview Scheduled", notes="Scheduled for next week."),
        Application(user_id=4, job_id=9, application_date="2025-03-25", status="Applied", notes="Applied with referral."),
        Application(user_id=5, job_id=10, application_date="2025-03-26", status="Rejected", notes="Got an email response.")
    ]

    db.session.add_all(applications)
    db.session.commit()

    print("Successfully seeded!")
