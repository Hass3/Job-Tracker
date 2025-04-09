import { Link } from "react-router-dom"



function JobApplicaionCard({a}){
    const {title,company_name,location} = a.job

    return(
        <Link>
        <div className="application-card">
        <p><strong>Job:</strong> {title}</p>
        <p><strong>Company:</strong> {company_name}</p>
        <p><strong>Location:</strong>{location}</p>
        <p><strong>Status:</strong> {a.status}</p>
        <p><strong>Posted On: </strong>{a.application_date}</p>
        </div>
        </Link>
    )
}

export default JobApplicaionCard