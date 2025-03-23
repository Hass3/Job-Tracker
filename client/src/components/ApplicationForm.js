import { useFormik } from "formik"
import * as yup from 'yup'


function ApplicationForm(){
    const formSchema = yup.object().shape({

    })
    
    const formik = useFormik({
        initialValues:{

        },
        validationSchema:formSchema,
        onSubmit :()=>{
            fetch('/application', {
                method:'POST',
                headers:{'Content-Type': 'application/json'}
            })
        }
    })




    return(
       <>
         <form onSubmit={formik.handleSubmit}>
            <input/>
            <input/>
            <input/>
         </form>
       </>

    )



}




export default ApplicationForm