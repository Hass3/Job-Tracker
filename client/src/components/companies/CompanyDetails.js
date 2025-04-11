import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import NavBar from "../NavBar"
import CompanyJobs from "./CompanyJobs"
import { UserContext } from "../../UserContext"
import JobForm from "../jobs/JobForm"
import './companies.css'

function CompanyDetails() {
    const [company, setCompany] = useState(null)

    const [jobForm, setJobForm] = useState(false)
    const { jobs, setJobs } = useContext(UserContext)
    const parms = useParams()
    const companyId = parms.id
  

    useEffect(() => {
        fetch(`/companies/${companyId}`)
            .then(r => r.json())
            .then(c => {
                setCompany(c)
                setJobs(c.jobs)
            })
    }, [companyId, setJobs])


    const jobFormbtn = () => setJobForm(on => !on)


    if (!company) { return <h1>Loading!</h1> }
    const { name, logo, description, head_quarters } = company


    return (
        <>
        <NavBar />
        <div className="company-details">
            
            {jobForm ?
                <JobForm
                    jobFormbtn={jobFormbtn}
                    companyId={companyId}
                    setJobForm={setJobForm}
                /> :
                <>
                <div className="company-header">
                <Link to="/companies">
              <button className="back-btn">Back</button>
                </Link>
            </div>
                <div className="company-details">
                 
                
             
                    <h2>{name}</h2>
                    <img alt={name} src={logo} />
                    <h2>{description}</h2>
                    <h4>Head Quarters: {head_quarters}</h4>
                    <button onClick={jobFormbtn}>Add Job For {name}</button>
                     <div className="job-container">
                    {jobs.map((job) =>
                        <CompanyJobs
                            key={job.id}
                            job={job}
                        />
                    )}
                    </div>
                </div>
                </>
            }

        </div>
    </>
    )
}


export default CompanyDetails