import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import CompanyCard from "./ComoanyCard";

function CompaniesPage (){
  const [companies, setCompanies] = useState([])

  useEffect(()=>{
    fetch('/companies')
    .then(r=>r.json())
    .then(companies=> setCompanies(companies))
  }, [])
    return(
        <>
        <NavBar/>
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