import { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import CompanyCard from "./CompanyCard";
import { UserContext } from "../UserContext";

function CompaniesPage (){
  const {user} =useContext(UserContext)
  const [companies, setCompanies] = useState([])
  const [formOn, setFormOn] = useState(false)
  useEffect(()=>{
    fetch('/companies')
    .then(r=>r.json())
    .then(companies=> setCompanies(companies))
  }, [])

    return(
        <>
        <NavBar/>
        <h1>{user.name}, Welcome back. Please Select a company for more details and jobs that has been added</h1>

        {
          companies.map((company)=>
          <CompanyCard
          key={company.id}
          company={company}
          />
          )
        }
        
        
        </>
    )
}


export default CompaniesPage