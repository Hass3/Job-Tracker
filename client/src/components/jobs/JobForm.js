import { useFormik } from "formik"
import { useContext } from "react"
import * as yup from 'yup'
import { UserContext } from "../../UserContext"
import '..//companies/companies.css'
function JobForm({ setJobForm, companyId}){
    const {onAddJob} = useContext(UserContext)
    const formSchema = yup.object().shape({
        title: yup.string().required('Must Enter Job Title'),
        description: yup.string().required('Must Enter Job Description'),
        location: yup.string().required('Must Enter Job Location'),
        salary: yup.number().positive().typeError("Must Be A Number").required('Must Enter Job Annual Salary').integer()
    })
    const formik =useFormik({
        initialValues:{
            title:"",
            description:"",
            location :"", 
            salary:""
        },
        validationSchema: formSchema,
        onSubmit:(values)=>{
            const jobJson = {
                'title': values.title,
                'description': values.description,
                'location': values.location,
                'salary': values.salary,
                'company_id': companyId
            }
            fetch('/jobs', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(jobJson)
            })
            .then(r=>r.json())
            .then(job=>onAddJob(job))
            setJobForm(on=>!on)
        }
    }) 
    return(
        <div className="company-form">
        <h1 className="form-title">Add New Job</h1>
        <form  onSubmit={formik.handleSubmit}>
            <label className="label">Title</label>
           
            <input 
            name = 'title'
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            className="form-input"
            />
      
        <label className="label">Description</label>
             <input 
            name = 'description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
             className="form-input"
            />
          
            <label className="label">Location</label>
             <input 
            name = 'location'
            value={formik.values.location}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
             className="form-input"
            />
              
              <label className="label">Salary</label>
             <input 
            name = 'salary'
            value={formik.values.salary}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
             className="form-input"
            />
           <p className="form-error">{formik.errors.title}</p>
           <p className="form-error">{formik.errors.description}</p>
           <p className="form-error">{formik.errors.location}</p>
           <p className="form-error">{formik.errors.salary}</p>
            <button className="form-button" type="submit">Add Job</button>
        </form>
       
      
      
        
        </div>
    )
}


export default JobForm



