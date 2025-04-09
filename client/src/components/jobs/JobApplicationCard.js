


function JobApplicaionCard({a}){
    const {title,company_name} = a.job

    return(
        <div className="application-card">
        <p><strong>Job:</strong> {title}</p>
        <p><strong>Company:</strong> {company_name}</p>
        <p><strong>Status:</strong>{a.status}</p>
        <p><strong>Notes:</strong> {a.notes}</p>
        <p><strong>Posted On: </strong>{a.application_date}</p>
        </div>
    )
}

export default JobApplicaionCard