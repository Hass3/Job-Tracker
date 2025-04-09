import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import NavBar from "../NavBar"
import CompanyJobs from "./CompanyJobs"
import CompanyEditForm from "./CompanyEditForm"
import { UserContext } from "../../UserContext"
import JobForm from "../jobs/JobForm"
import './companies.css'

function CompanyDetails() {
    const [company, setCompany] = useState(null)
    const [formOn, setFormOn] = useState(false)
    const [jobForm, setJobForm] = useState(false)
    const { companies, setCompanies, jobs, setJobs } = useContext(UserContext)
    const parms = useParams()
    const companyId = parms.id
    const navigate = useNavigate()

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
                </>
            }

        </div>
    </>
    )
}


export default CompanyDetails