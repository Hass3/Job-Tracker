import {useFormik} from 'formik'
import * as yup from'yup'

function JobEditForm({job, onEditJob, setJobEdit, companyId,setJob}){
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
            fetch(`/jobs/${job.id}`, {
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(jobJson)
            })
            .then(r=>r.json())
            .then(job=>{
                onEditJob(job)
                setJob(job)
            })
            setJobEdit(on=>!on)
        }
    }) 
    return(
    <div className='edit-form-container'>
        <h2 className='title'>Edit Job</h2>

     <form className='edit-form' onSubmit={formik.handleSubmit}>
     <label >Title:</label>
            <input 
            name = 'title'
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
            <p className='error' >{formik.errors.title}</p>
            <label>Description:</label>
             <input 
            name = 'description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
             <p className='error'>{formik.errors.description}</p>
             <label>Location:</label>
             <input 
            name = 'location'
            value={formik.values.location}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
              <p className='error'>{formik.errors.location}</p>
              <label>Salary:</label>
             <input 
            name = 'salary'
            value={formik.values.salary}
            onChange={formik.handleChange}
            placeholder="Enter Here..."
            />
            <p className='error'>{formik.errors.salary}</p>
            <button className='submit-btn' type="submit">Edit Job</button>
        </form>
     
       
      
        
        </div>
   )


}


export default JobEditForm