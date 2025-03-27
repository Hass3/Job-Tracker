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
    const { companies, setCompanies, onDeleteCompany, jobs, setJobs } = useContext(UserContext)
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


    const formBtn = () => setFormOn(on => !on)  // For Edit Form
    const jobFormbtn = () => setJobForm(on => !on)

    const handelDeleteClick = () => {
        fetch(`/companies/${companyId}`, {
            method: 'DELETE'
        })
            .then(r => r)
            .then(() => onDeleteCompany(company))
        navigate('/companies')
    }


    const handelEditCompany = (updatedCompany) => {
        const updatedCompanies = companies.map(c => {
            if (c.id === updatedCompany.id) {
                return updatedCompany
            } else {
                return c
            }
        })
        setCompanies(updatedCompanies)
        setCompany(updatedCompany)
    }



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
                    <button onClick={handelDeleteClick} className="delete-btn">Delete Company</button>
                    <button onClick={formBtn}>{formOn ? 'back' : 'edit'}</button>
                    <button onClick={jobFormbtn}>Add Job For {name}</button>
                    {formOn ?
                        <CompanyEditForm
                            comapny={company}
                            onEditCompany={handelEditCompany}
                            setFormOn={setFormOn}
                        />

                        : null}
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