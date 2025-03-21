import { useParams } from "react-router-dom"
import { useState,useEffect, useContext } from "react"
import NavBar from "./NavBar"
import CompanyJobs from "./CompanyJobs"
import CompanyEditForm from "./CompanyEditForm"
import { UserContext, UserProvider } from "../UserContext"

function CompanyDetails(){
   const [company, setCompany] = useState(null)
   const [formOn, setFormOn] = useState(false)
   const {companies, setCompanies} = useContext(UserContext)
   const parms = useParams()
   const companyId = parms.id

   useEffect(()=>{
       fetch(`/companies/${companyId}`)
       .then(r=>r.json())
       .then(c => {
        setCompany(c)
       })
   }, [])


const formBtn = ()=> setFormOn(on=>!on)

const handelEditCompany = (updatedCompany)=>{
    const updatedCompanies = companies.map(c=>{
        if(c.id === updatedCompany.id){
            return updatedCompany
        }else{
            return c
        }
    })
    setCompanies(updatedCompanies)
    setCompany(updatedCompany)
}


if (!company){return <h1>Loading!</h1>}
const {name, logo, description, head_quarters, jobs} = company


return(
<>
<NavBar/>
<h2>{name}</h2>
<img src={logo}/>
<h2>{description}</h2>
<h4>Head Quarters: {head_quarters}</h4>
<button onClick={formBtn}>{formOn ? 'back': 'edit'}</button>
{formOn ? 
<CompanyEditForm 
comapny={company}
onEditCompany={handelEditCompany}
setFormOn={setFormOn}
/>
: null}
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