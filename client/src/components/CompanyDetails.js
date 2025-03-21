import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import NavBar from "./NavBar"
import CompanyJobs from "./CompanyJobs"

function CompanyDetails(){
   const [company, setCompany] = useState(null)
   const parms = useParams()
   const companyId = parms.id

   useEffect(()=>{
       fetch(`/companies/${companyId}`)
       .then(r=>r.json())
       .then(c => {
        setCompany(c)
       })
   }, [])

if (!company){return <h1>Loading!</h1>}
const {name, logo, description, head_quarters, jobs} = company


return(
<>
<NavBar/>
<h2>{name}</h2>
<img src={logo}/>
<h2>{description}</h2>
<h4>Head Quarters: {head_quarters}</h4>
{jobs.map((job)=>
<CompanyJobs 
key={job.id}
job={job}
/>
)}
</>
)
}


export default CompanyDetails