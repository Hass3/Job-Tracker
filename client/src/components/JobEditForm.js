import {useFormik} from 'formik'
import * as yup from'yup'


function JobEditForm({job, onEditJob, setJobEdit, companyId}){
    const formSchema = yup.object().shape({
        title: yup.string().required('Must Enter Job Title'),
        description: yup.string().required('Must Enter Job Description'),
        location: yup.string().required('Must Enter Job Location'),
        salary: yup.number().positive().typeError("Must Be A Number").required('Must Enter Job Annual Salary').integer()
    })

    const formik =useFormik({
        initialValues:{
            title:`${job.title}`,
            description:`${job.description}`,
            location :`${job.location}`, 
            salary:`${job.salary}`
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
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(jobJson)
            })
            .then(r=>r.json())
            .then(job=>onEditJob(job))
            setJobEdit(on=>!on)
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
            <button type="submit">Edit Job</button>
        </form>
        <p>{formik.errors.title}</p>
        <p>{formik.errors.description}</p>
        <p>{formik.errors.location}</p>
        <p>{formik.errors.salary}</p>
        
        </>
   )


}


export default JobEditForm