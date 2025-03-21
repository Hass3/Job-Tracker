import { useFormik } from "formik";
import * as yup from 'yup'

function CompanyForm({onAddCompany, setFormOn}){
    
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
        fetch('/companies',{
            method:"POST", 
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(formJson)
        })
        .then(r=>r.json())
        .then(c=> onAddCompany(c) )
        setFormOn((on)=>!on)
    }
       
   })
   

    return(
      <>
      <form onSubmit={formik.handleSubmit}>
        <input
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Enter name"
        />
         <input
        name="logo"
        value={formik.values.logo}
        onChange={formik.handleChange}
         placeholder="Enter Logo Url"
        />
         <input
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        placeholder="Enter Description"
        />
         <input
        name='headQuarters'
        value={formik.values.headQuarters}
        onChange={formik.handleChange}
        placeholder="Enter HQ"
        />
        <button type='submit'>Add Company To List</button>
      </form>
      <p>{formik.errors.name}</p>
      <p>{formik.errors.logo}</p>
      <p>{formik.errors.description}</p>
      <p>{formik.errors.headQuarters}</p>
      </>

    )


}



export default CompanyForm