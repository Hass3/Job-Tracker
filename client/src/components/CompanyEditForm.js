import { useFormik } from "formik"
import * as yup from 'yup'



function CompanyEditForm({comapny}){
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
            
        }
    }))

    return(
        <>
        <form>
            <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            />
             <input
            name="logo"
            value={formik.values.logo}
            onChange={formik.handleChange}
            />
             <input
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            />
             <input
            name="headQuarters"
            value={formik.values.headQuarters}
            onChange={formik.handleChange}
            />

            <button type="submit">Complete</button>


        </form>
    
        </>
    )




}

export default CompanyEditForm