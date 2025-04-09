import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function JobApplicationDetails(){
    const [application, setApplication] = useState(null)
    const parms = useParams()
    const aId = parms.id


    useEffect(()=>{
      fetch(`/applications/${aId}`)
      .then(r=>r.json())
       .then(a=> setApplication(a))
    },[])

    console.log(application)
   return(
    <>
    <h1>{application.status}</h1>
    </>



)


}


export default JobApplicationDetails


