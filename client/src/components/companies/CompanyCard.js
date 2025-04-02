import { Link } from "react-router-dom"

function CompanyCard({ company }) {
   const { id, name, logo, description } = company


   return (
      <div className="company-card" key={id}>
         <h3>{name}</h3>
         <Link to={`/companies/${id}`}><img src={logo} alt={name}/></Link>
         <h4>{description}</h4>
      </div>
   )
}

export default CompanyCard