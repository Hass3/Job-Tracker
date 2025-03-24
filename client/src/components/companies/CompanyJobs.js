import { Link } from "react-router-dom"

function CompanyJobs({job}){

    const {id,title, description, location, salary } = job
    
    return(
       <>
       
       <div>
        <h1>
            {title}
        </h1>
        <h3>{description}</h3>
        <h3>location: {location}</h3>
        <h4>salary: {salary}</h4>
        <Link to={`/jobs/${id}`}><p>Click Here For More Info</p></Link>
       </div>
       </>

    )



}



export default CompanyJobs