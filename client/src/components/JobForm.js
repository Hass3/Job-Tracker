import { useFormik } from "formik"
import * as yup from 'yup'

function JobForm({onAddJob, setJobForm}){
    const formSchema = yup.object().shape({
        title: yup.string().required('Must Enter Job Title'),
        description: yup.string().required('Must Enter Job Description'),
        location: yup.string().required('Must Enter Job Location'),
        salary: yup.number().positive().required('Must Enter Job Annual Salary').integer()
    })
    const formik =useFormik({
        initialValues:{
            title:"",
            description:"",
            location :"", 
            salary:''
        },
        validationSchema: formSchema,
        onSubmit:(values)=>{
            
        }
    }) 
    return(
        <>
        <form  onSubmit={formik.handleSubmit}>
            <input 
            name = 'title'
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
             <input 
            name = 'description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
             <input 
            name = 'location'
            value={formik.values.location}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
             <input 
            name = 'salary'
            value={formik.values.salary}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
            <button>Add Job</button>
        </form>
        <p>{formik.errors.title}</p>
        <p>{formik.errors.description}</p>
        <p>{formik.errors.location}</p>
        <p>{formik.errors.salary}</p>
        
        </>
    )
}


export default JobForm



