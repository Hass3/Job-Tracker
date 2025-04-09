


function JobApplicaionCard({a}){

    return(
        <>
        <h1>{a.user}</h1>
        <h1>{a.job.title}</h1>
        <h3>{a.job.salary}</h3>
        <h3>{a.job.company_name}</h3>
        </>
    )



}

export default JobApplicaionCard