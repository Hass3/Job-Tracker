import { useParams } from "react-router-dom"
import NavBar from "./NavBar"
import { useEffect, useState } from "react"


function JobDetails(){
   const [job, setJob] = useState(null)
   const parms = useParams()
   const jobId = parms.id 

   useEffect(()=>{
    fetch(`/jobs/${jobId}`)
    .then(r=>r.json())
    .then(j=>setJob(j))
}, [])
    


    if (!job){return <h1>Loading...</h1>}

    return(
      <>
      <NavBar/>
      <h1>{job.title}</h1>
      </>


  )




}





export default JobDetails