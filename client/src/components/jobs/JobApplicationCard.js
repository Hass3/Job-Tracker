


function JobApplicaionCard({a}){
    
    return(
        <>
        <h1>{a.user_name}</h1>
        Salary: <h3>{a.job.salary}</h3>
        <h3>{a.job.company_name}</h3>
        Status: <p>{a.status}</p>
        Notes: <p>{a.notes}</p>
        </>
    )



}

export default JobApplicaionCard