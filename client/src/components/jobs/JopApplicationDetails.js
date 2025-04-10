import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../NavBar"
import ApplicationEditForm from "./ApplicationEditForm"
import { UserContext } from "../../UserContext"


function JobApplicationDetails(){
    const [application, setApplication] = useState(null)
    const [isFormOn, setIsFormOn] = useState(false)
    const {applications, setApplications} = useContext(UserContext)
    const parms = useParams()
    const aId = parms.id
    const navagate = useNavigate()
    useEffect(()=>{
      fetch(`/applications/${aId}`)
      .then(r=>r.json())
       .then(a=> setApplication(a))
    },[])



 
   const onDelete = (deletedA)=>{
        const updatedApplications = applications.filter(a=> a.id !== deletedA.id)
        setApplications(updatedApplications)
   }
   const onEdit = (updatedA)=>{
      const updatedApplications = applications.map(a=>{
        if(a.id == updatedA.id){
            setApplication(updatedA)
            return updatedA
        }else{
            setApplication(a)
            return a
        }
     })
     setApplications(updatedApplications)
 }


 const onDeleteClick = ()=>{
    fetch(`/applications/${aId}`,{
      method:'DELETE'
    })
    .then(r=>r)
    .then(()=>onDelete(application))
    navagate('/jobs')
 }

   const onFormClick=()=>setIsFormOn(on=>!on)
  
   if(!application){return <h1>Loading...</h1>}
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
    <button onClick={onFormClick}>{!isFormOn?'Edit Application' :'Back'}</button> 
    <button onClick={onDeleteClick}>Remove Job Application</button>
    <h2>Application Status:</h2>
    <p><strong>Status:</strong>{application.status}</p>
    <p><strong>Notes:</strong> {application.notes}</p>
    <p><strong>Posted At:</strong> {application.application_date}</p>
    </div>
    {isFormOn? <ApplicationEditForm onEdit={onEdit} application={application}/> : null}
    </>



)


}


export default JobApplicationDetails


