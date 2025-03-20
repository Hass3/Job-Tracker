import { useState, useContext} from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
function Login(){
    const navagate = useNavigate()
    
    const {user, setUser}= useContext(UserContext)

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
            .then(r =>{
                if (r.ok){
                    r.json().then(user => {
                        setUser(user)
                        console.log(user.name)
                })}
            })
        }
    })

    return(
        <>
        <NavBar/>
        <form onSubmit={formik.handleSubmit}>
            <input name="username" 
            onChange={formik.handleChange}
            value={formik.values.username} 
            placeholder="Enter Username"/>

            <input name="password" 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            placeholder="Enter Password"/>
            
            <button type="submit">Login</button>
            
            <p>{formik.errors.username}</p>
            <p>{formik.errors.password}</p>
        </form>
        </>
    )


}

export default Login