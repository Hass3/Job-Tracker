import { useParams } from "react-router-dom"
import NavBar from "./NavBar"
import { useContext, useEffect, useState } from "react"
import JobEditForm from "./JobEditForm"
import { UserContext } from "../UserContext"


function JobDetails(){
   const [job, setJob] = useState(null)
   const [jobEditForm, setJobEdit] = useState(false)
   const {jobs,setJobs} = useContext(UserContext)
   const parms = useParams()
   const jobId = parms.id 

   useEffect(()=>{
    fetch(`/jobs/${jobId}`)
    .then(r=>r.json())
    .then(j=>setJob(j))
}, [])
    
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
    
    if (!job){return <h1>Loading...</h1>}

    return(
      <>
      <NavBar/>
      <h1>{job.title}</h1>
      <button onClick={handelEditForm}>{jobEditForm?'Back': "Edit Job"}</button>
      {jobEditForm? 
      <JobEditForm
      onEditJob={handelOnEdit}
      job={job}
      setJobEdit={setJobEdit}
      />:null}

      </>


  )




}





export default JobDetails