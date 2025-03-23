import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect, useContext } from "react"
import NavBar from "./NavBar"
import CompanyJobs from "./CompanyJobs"
import CompanyEditForm from "./CompanyEditForm"
import { UserContext, UserProvider } from "../UserContext"
import JobForm from "./JobForm"

function CompanyDetails(){
   const [company, setCompany] = useState(null)
   const [formOn, setFormOn] = useState(false)
   const[jobForm, setJobForm] = useState(false)
   const {companies, setCompanies, onDeleteCompany, jobs,setJobs} = useContext(UserContext)
   const parms = useParams()
   const companyId = parms.id
   const navagate = useNavigate()

   useEffect(()=>{
       fetch(`/companies/${companyId}`)
       .then(r=>r.json())
       .then(c => {
        setCompany(c)
        setJobs(c.jobs)
       })
   }, [])


const formBtn = ()=> setFormOn(on=>!on)  // For Edit Form
const jobFormbtn =()=>setJobForm(on=>!on)

const handelDeleteClick=()=>{
    fetch(`/companies/${companyId}`,{
         method:'DELETE'
      })
      .then(r=>r)
      .then(()=>onDeleteCompany(company))
       navagate('/companies')
   }


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
const {name, logo, description, head_quarters} = company


return(
<>
<NavBar/>
<h2>{name}</h2>
<img src={logo}/>
<h2>{description}</h2>
<h4>Head Quarters: {head_quarters}</h4>
<button onClick={handelDeleteClick}>Delete Company</button>
<button onClick={formBtn}>{formOn ? 'back': 'edit'}</button>
<button onClick={jobFormbtn}>{jobForm ? 'back': `Add Job For ${name}` }</button>
{formOn ? 
<CompanyEditForm 
comapny={company}
onEditCompany={handelEditCompany}
setFormOn={setFormOn}
/>

: null}
{jobForm? 
<JobForm

companyId={companyId}
setJobForm={setJobForm}
/> : null}
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