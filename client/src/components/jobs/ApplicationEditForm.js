import { useFormik } from "formik"
import * as yup from 'yup'



function ApplicationEditForm({application, onEdit}){
    const formik = useFormik({
        initialValues:{
            status:`${application.status}`,
            notes: `${application.notes}`
        },
        onSubmit:(values)=>{
            const formJson = {
                'status': values.status,
                'notes': values.notes 
            }
            fetch(`/applications/${application.id}`,{
                method:'PATCH',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(formJson)
            })
            .then(r=>r.json())
            .then(application=>onEdit(application))
        }
    })
    return(
   <>
    <form onSubmit={formik.handleSubmit}>
    <label>Set Status:</label>
   <select name="status" value={formik.values.status} onChange={formik.handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Pending</option>
        </select>
    <label>Notes:(optional)</label>
    <textarea name='notes' value={formik.values.notes} onChange={formik.handleChange}/>
    <button>Complete</button>
    </form>

   </>
)
}



export default ApplicationEditForm