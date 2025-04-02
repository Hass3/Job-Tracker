import { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar";
import CompanyCard from "./CompanyCard";
import { UserContext } from "../../UserContext";
import CompanyForm from './CompanyForm'
import './companies.css'
function CompaniesPage() {
  const { user, companies, setCompanies } = useContext(UserContext)

  const [formOn, setFormOn] = useState(false)


  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany])
  }


  const formBtn = () => setFormOn(on => !on)

  return (
    <>
      <NavBar />
      <div className="contanier">
        {!user ? null :
          <h1 className="page-h1">{!formOn ? `Hello ${user.name}, to see more deatils and jobs of a company please click on the logo icon` : null}</h1>
        }
        <button className="page-button" onClick={formBtn}>{formOn ? 'Back' : 'Add Company To List'}</button>
        {formOn ?
          <CompanyForm onAddCompany={handleAddCompany} setFormOn={setFormOn} />
          :
          <div className="company-list">
            {!companies || !user ? <h1 className="loading">loading...</h1> :

              companies.map((company) =>
                <CompanyCard
                  key={company.id}
                  company={company}
                />
              )

            }
          </div>
        }
      </div>

    </>
  )
}


export default CompaniesPage