import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../NavBar"
import { useContext, useEffect, useState } from "react"
import JobEditForm from "./JobEditForm"
import { UserContext } from "../../UserContext"
import ApplicationForm from "./ApplicationForm"


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
            if(updatedJob.id == job.id){
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
    if (!job){return <h1>Loading...</h1>}
    
    
    return(
      <>
      <NavBar/>
      <h1>{job.title}</h1>
      <h2>{job.description}</h2>
      <h2>Salary: ${job.salary}</h2>
      <button onClick={handelEditForm}>{jobEditForm?'Back': "Edit Job"}</button>
      <button onClick={handelDeleteClick}>remove job</button>
      {jobEditForm? 
      <JobEditForm
      onEditJob={handelOnEdit}
      job={job}
      setJobEdit={setJobEdit}
      setJob={setJob}
      companyId={job.company_id}
      />:null}
      {!application?.status ? <button onClick={applyBtnClick}>{!applicationFormBtn?'Apply':'Back' }</button>:
      <button onClick={onDeleteApplication}>Delete Application</button>
      }

      {
        applicationFormBtn? 
        <ApplicationForm
        setApplication={setApplication}
        setApplyBtn={setApplicationFormBtn}
        jobId={job.id}
        userId={user.id}
    
        />: null
      }

      <>
      <h3>Application Status:</h3>
      {application?.status ? 
        <p>You have Applied for this job. Status: {application.status} Notes: {application.notes} Posted date: {application.application_date}</p>
    : <p>No Application Yet</p>}
      </>
      

      </>

      )




}





export default JobDetails