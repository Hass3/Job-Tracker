import { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import CompanyCard from "./CompanyCard";
import { UserContext } from "../UserContext";
import CompanyForm from "./CompanyForm";

function CompaniesPage (){
  const {user, companies, setCompanies} =useContext(UserContext)

  const [formOn, setFormOn] = useState(false)


  const handleAddCompany = (newCompany)=>{
    setCompanies([...companies, newCompany])
  }
  

  const formBtn =()=> setFormOn(on=>!on)
    
    return(
        <>
        <NavBar/>
         {!user? null :
        <h1>{user.name}, Welcome back. Please Select a company for more details and jobs that has been added</h1>
        }
        <button onClick={formBtn}>{formOn?'Back':'Add Company To List'}</button>
        {formOn?
        <CompanyForm onAddCompany={handleAddCompany} setFormOn={setFormOn}/>
        : null}
        {!companies? <h1>loading...</h1>:

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