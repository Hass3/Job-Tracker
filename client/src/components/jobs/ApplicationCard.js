import { useState } from "react"
import ApplicationForm from "./ApplicationForm"
import ApplicationEditForm from "./ApplicationEditForm"


function ApplicationCard({a, onEditApplication , onDeleteApplication}){
   const [isFormOn, setIsFormOn] = useState(false)
   const onFormClick = () => setIsFormOn(on => !on)

   const onDeleteClick = () => {
    fetch(`/applications/${a.id}`, {
        method: 'DELETE'
    })
        .then(r => r)
        .then(() => onDeleteApplication(a))
}



   
    return(
     <>
     {!isFormOn?
     <div className="application-card">
     <h1>{a.status}</h1>
     <p>{a.notes}</p>
     <p>{a.application_date}</p>
     <button className="application-btn" onClick={onFormClick}>Edit Application</button>
     <button className="application-btn remove" onClick={onDeleteClick}>Remove Application</button>
     </div>
     : <ApplicationEditForm onEdit={onEditApplication} application={a} onEditBtn={onFormClick}/>
}
     </>


    )


}

export default ApplicationCard