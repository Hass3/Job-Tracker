import { useFormik } from "formik"
import * as yup from 'yup'




function ApplicationForm({onApply}){

  return(
       <>
         <form onSubmit={null}>
            <select>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Pending</option>
            </select>
            <button type='submit'> Submit Application</button>
         </form>
       </>

    )



}




export default ApplicationForm