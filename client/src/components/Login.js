import { useState} from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import NavBar from "./NavBar";

function Login(){
    const fromSchema = yup.object().shape({
        username: yup.string().required('Must Enter username'),
        password: yup.string().required("Must Enter password")
    })

    const formik = useFormik({
        initialValues:{
            username:'',
            password: ''
        },
        validationSchema: fromSchema,
        onSubmit:(values)=>{
            const formJson = {
                'username': values.username,
                'password': values.password
            }
            fetch('/login',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formJson)
            })
            // .then(r =>{
            //     if (r.ok)=>{
            //         r.json().then(user)
            //     }
            // })
        }
    })

    return(
        <>
        <NavBar/>
        <form onSubmit={formik.onSubmit}>
            <input placeholder="Enter Username"/>
            <input placeholder="Enter Password"/>
            <button>Login</button>
        </form>
        </>
    )


}

export default Login