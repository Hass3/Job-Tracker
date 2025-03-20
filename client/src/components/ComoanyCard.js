
function CompanyCard({company}){
   const {id, name, logo, description} = company
   return(
    <div key={id}>
    <h3>{name}</h3>
    <img src={logo} alt={name}/>
    <h4>{description}</h4>
    </div>
   )
}

export default CompanyCard