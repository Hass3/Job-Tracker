import { Link } from "react-router-dom"



function JobCards({j}){

    if (!j){return <h2>Loading...</h2>}
    return(
        <Link className="link" to={`/job/${j.id}`}>
        <div  className='job-card'>
        <h3>{j.title}</h3>
        <p>at: {j.company.name}</p>
        <h4>{j.description}</h4>
        <p>Location: {j.location}</p>
        </div>
        </Link>
    )
}

export default JobCards