import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../NavBar"
import { useContext, useEffect, useState } from "react"
import JobEditForm from "./JobEditForm"
import { UserContext } from "../../UserContext"
import ApplicationForm from "./ApplicationForm"
import './jobs.css'

function JobDetails(){
   const [job, setJob] = useState(null)
   const [jobEditForm, setJobEdit] = useState(false)
   const [application,setApplication] = useState({})
   const [applicationFormBtn, setApplicationFormBtn] = useState(false)
   const {user,jobs,setJobs} = useContext(UserContext)
   
   const userId = user?.id
   const parms = useParams()
   const jobId = parms.id 
   const navagate = useNavigate()


   useEffect(()=>{
    fetch(`/jobs/${jobId}`)
    .then(r=>r.json())
    .then(j=>{
        setJob(j)
        const userApplication = j.applications?.find((app)=>app.user_id === userId)
        if (userApplication){
            setApplication(userApplication)
        }
    })  
}, [jobId, userId])
 
    const handelOnEdit = (updatedJob)=>{
        const updatedJobs = jobs.map((job)=>{
            if(updatedJob.id === job.id){
                return updatedJob
            }else{
                return job
            }
        })
        setJobs(updatedJobs)
    }
    const handelEditForm =()=>setJobEdit(on=>!on)
    const onDeleteJob = (deletedJob)=>{
        const updatedJobs = jobs.filter(job => job.id !== deletedJob.id)
        setJobs(updatedJobs)
    }
    
    const handelDeleteClick = ()=>{
        fetch(`/jobs/${jobId}`,{
            method:"DELETE"
        })
        .then(r=>r)
        .then(()=>onDeleteJob(job))
        navagate(`/companies/${job.company_id}`)
    }

    const onDeleteApplication = ()=>{
        fetch(`/applications/${application.id}`,{
            method:"DELETE",
        })
        setApplication({})
        
    }
    const applyBtnClick =() =>setApplicationFormBtn(on=>!on)
    if (!job){return <h1 className="loading">Loading...</h1>}
    
    
    return(
      <>
      <NavBar/>
      {jobEditForm ? 
      <JobEditForm
      onEditJob={handelOnEdit}
      job={job}
      setJobEdit={setJobEdit}
      setJob={setJob}
      companyId={job.company_id}
      /> :
      <div className="job-details-contanier">
      <h1 className="job-title">{job.title}</h1>
      <h2 className="job-description">{job.description}</h2>
      <h2 className="job-salary">💰 Salary: ${job.salary}</h2>
      
      <div className="button-container">
      <button className="edit-btn" onClick={handelEditForm}>Edit Job</button>
      <button className="j-delete-btn" onClick={handelDeleteClick}>Remove job</button>
      {!application?.status ? <button className="apply-btn" onClick={applyBtnClick}>{!applicationFormBtn?'Apply':'Cancel' }</button>:
      <button className="delete-application" onClick={onDeleteApplication}>Delete Application</button>
      }
      </div>

    


    

      {
        applicationFormBtn? 
        <ApplicationForm
        setApplication={setApplication}
        setApplyBtn={setApplicationFormBtn}
        jobId={job.id}
        userId={user.id}
    
        />: null
      }

      <div className="application-status">
      <h3>Application Status:</h3>
      {application?.status ? 
        <p>
        ✅ You have applied for this job. <br />
        <strong>Status:</strong> {application.status} <br />
        <strong>Notes:</strong> {application.notes} <br />
        <strong>Posted On:</strong> {application.application_date}
      </p>
    : <p>❌ No Application Yet</p>}
      </div>
      </div>
     }
      </>

      )




}





export default JobDetails