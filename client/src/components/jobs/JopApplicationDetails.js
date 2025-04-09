import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../NavBar"


function JobApplicationDetails(){
    const [application, setApplication] = useState(null)
    const parms = useParams()
    const aId = parms.id
   
    useEffect(()=>{
      fetch(`/applications/${aId}`)
      .then(r=>r.json())
       .then(a=> setApplication(a))
    },[])


   if (!application){return <h1>Loading...</h1>}
   const {title, salary, description, company_name, location} = application.job
   return(
    <>
    <NavBar/>
    <div>
    <h3><strong>Job:</strong>{title}</h3>
    <h4><strong>Salary:</strong>{salary}</h4>
    <h4><strong>Location:</strong>{location}</h4>
    <h4><strong>Description:{description}</strong></h4>
    <h4><strong>Company:</strong>{company_name}</h4>
    <button>Edit Application</button> 
    <button>Remove Job Application</button>
    <h2>Application Status:</h2>
    <p><strong>Status:</strong>{application.status}</p>
    <p><strong>Notes:</strong> {application.notes}</p>
    <p><strong>Posted At:</strong> {application.application_date}</p>
    </div>
    </>



)


}


export default JobApplicationDetails


