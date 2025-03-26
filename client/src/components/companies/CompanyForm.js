import { useFormik } from "formik";
import * as yup from 'yup'
import './companies.css'
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
      <div className="company-form">
        <h1 className="form-title">Add New Company</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Enter name"
        className="form-input"
        />
         <p className="error">{formik.errors.name}</p>
         <input
        name="logo"
        value={formik.values.logo}
        onChange={formik.handleChange}
         placeholder="Enter Logo Url"
         className="form-input"
        />
         <p className="error">{formik.errors.logo}</p>
         <input
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        placeholder="Enter Description"
        className="form-input"
        />
          <p className="error">{formik.errors.description}</p>
         <input
        name='headQuarters'
        value={formik.values.headQuarters}
        onChange={formik.handleChange}
        placeholder="Enter HQ"
        className="form-input"
        />
        <p className="error">{formik.errors.headQuarters}</p>
        <button className="form-button" type='submit'>Add Company To List</button>
      </form>
    
      </div>

    )


}



export default CompanyForm