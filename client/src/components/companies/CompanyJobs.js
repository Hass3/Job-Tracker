import { Link } from "react-router-dom"
import './companies.css'
function CompanyJobs({ job }) {

    const { id, title, description, location, salary } = job

    return (
        <>
           <Link className="link" to={`/jobs/${id}`}>
            <div className="company-job-card">
                <h1>
                    {title}
                </h1>
                <h3>{description}</h3>
                <h3>location: {location}</h3>
                <h4>salary: {salary}</h4>
          
            </div>
            </Link>
        </>

    )



}



export default CompanyJobs