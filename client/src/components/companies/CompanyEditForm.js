import { useFormik } from "formik"
import * as yup from 'yup'
import './companies.css'


function CompanyEditForm({comapny, onEditCompany, setFormOn}){
    const fromSchema = yup.object().shape({
        name: yup.string().required("Name Required"),
        logo: yup.string().required('Logo url Required'), 
        description: yup.string().required('Description Required'),
        headQuarters:yup.string().required('Head Quarters Required')
      })

    const formik = useFormik(({
        initialValues:{
            name: `${comapny.name}`,
            logo:`${comapny.logo}`,
            description:`${comapny.description}`,
            headQuarters: `${comapny.head_quarters}`
        },
        validationSchema:fromSchema,
        onSubmit:(values)=>{
            const formJson  ={
                'name': values.name,
                'logo': values.logo,
                'description': values.description,
                'head_quarters': values.headQuarters
            }
            fetch(`/companies/${comapny.id}`, {
                method:"PATCH",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(formJson)
            })
            .then(r=>r.json())
            .then(c=>{
                onEditCompany(c)
                setFormOn(on=>!on)
            }).catch(e=>console.error('Error', e))
        }

    }))

    return(
        <div className="company-form">
            <h1>Edit Company</h1>
            <form  onSubmit={formik.handleSubmit}>
            <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="form-input"
            />
            <p className="error">{formik.errors.name}</p>
             <input
            name="logo"
            value={formik.values.logo}
            onChange={formik.handleChange}
            className="form-input"
            />
            <p  className="error">{formik.errors.logo}</p>
             <input
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="form-input"
            />
            <p  className="error">{formik.errors.description}</p>
             <input
            name="headQuarters"
            value={formik.values.headQuarters}
            onChange={formik.handleChange}
            className="form-input"
            />
             <p  className="error">{formik.errors.headQuarters}</p>

            <button className="form-button" type="submit">Complete</button>
        </form>
      
       
        
       
    
        </div>
    )




}

export default CompanyEditForm