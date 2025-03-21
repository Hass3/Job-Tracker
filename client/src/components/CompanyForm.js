import { useFormik } from "formik";
import * as yup from 'yup'

function CompanyForm(){
    
   const fromSchema = yup.object().shape({
       name: yup.string().required("Name Required"),
       logo: yup.string().required('Logo url Required'), 
       description: yup.string().required('Description Required'),
       headQuarters:yup.string().required('Head Quarters Required')
   })

   const formik = useFormik({
    initialValues:{
        name: '',
        logo: '',
        description: '',
        headQuarters: ''
    }, 
    validationSchema: fromSchema,
    onSubmit:(values)=>{
        const formJson  ={
            'name': values.name,
            'logo': values.logo,
            'description': values.description,
            'head_quarters': values.headQuarters
        }
    }
   })
   

    return(
      <>
      <form>
        <input
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        />
         <input
        name="logo"
        value={formik.values.logo}
        onChange={formik.handleChange}
        />
         <input
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        />
         <input
        name='headQuarters'
        value={formik.values.headQuarters}
        onChange={formik.handleChange}
        />

      </form>
      
      </>

    )


}



export default CompanyForm