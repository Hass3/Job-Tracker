import {useParams,Link } from "react-router-dom"
import NavBar from "../NavBar"
import { useContext, useEffect, useState } from "react"

import { UserContext } from "../../UserContext"
import ApplicationForm from "./ApplicationForm"
import './jobs.css'

function JobDetails() {
   
    const [applicationFormBtn, setApplicationFormBtn] = useState(false)
    const {user,job,setJob} = useContext(UserContext)

    const userId = user?.id
    const parms = useParams()
    const jobId = parms.id



    useEffect(() => {
        fetch(`/jobs/${jobId}`)
            .then(r => r.json())
            .then(j => setJob(j))
    }, [jobId, userId])


    const applyBtnClick = () => setApplicationFormBtn(on => !on)
    if (!job) { return <h1 className="loading">Loading...</h1> }

    return (
        <>
            <NavBar />
             <div className="job-header">
                <Link to={`/companies/${job.company_id}`}>
                    <button className="back-btn">Back</button>
                    </Link>
            </div>
            <div className="job-details-contanier">
                
                <h1 className="job-title">{job.title}</h1>
                <h2 className="job-description">{job.description}</h2>
                <h2 className="job-salary">💰 Salary: ${job.salary}</h2>

                <div className="button-container">

                    <button className="apply-btn" onClick={applyBtnClick}>{!applicationFormBtn ? 'Apply' : 'Cancel'}</button>

                </div>
                {
                    applicationFormBtn ?
                        <ApplicationForm
                            setApplyBtn={setApplicationFormBtn}
                            jobId={job.id}
                            userId={user.id}

                        /> : null
                }
            </div>

        </>

    )




}





export default JobDetails