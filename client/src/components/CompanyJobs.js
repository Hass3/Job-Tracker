

function CompanyJobs({job}){

    const {title, description, location, salary } = job

    return(
       <>
       <div>
        <h1>
            {title}
        </h1>
        <h3>{description}</h3>
        <h3>location: {location}</h3>
        <h4>salary: {salary}</h4>
       </div>
       </>

    )



}



export default CompanyJobs