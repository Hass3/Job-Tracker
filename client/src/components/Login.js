import { useState, useContext } from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import './loginandsignup.css'
function Login() {
    const navagate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    const fromSchema = yup.object().shape({
        username: yup.string().required('Must Enter username'),
        password: yup.string().required("Must Enter password")
    })


    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: fromSchema,
        onSubmit: (values) => {
            const formJson = {
                'username': values.username,
                'password': values.password
            }
            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formJson)
            })
                .then(r => {
                    if (r.ok) {
                        r.json().then(user => {
                            setUser(user)
                            navagate('/companies')
                            console.log(user.name)
                        })
                    }
                })
        }
    })

    return (
        <>
            <NavBar />
        <div className="login-container">
            <div className="login-card">
            <form onSubmit={formik.handleSubmit}>
                <label className="l-label">Username</label>
                <input name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Enter Username" 
                    className="l-input"/>
               <p className="error">{formik.errors.username}</p>
                <label className="l-label">password</label>
                <input name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter Password"
                    className="l-input" />
                <p className="error">{formik.errors.password}</p>
                <button className="l-button" type="submit">Login</button>

               
              
            </form>
            </div>
        </div>
        </>
    )


}

export default Login