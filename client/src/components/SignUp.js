import { useContext, useState } from "react";
import NavBar from "./NavBar";
import { UserContext } from "../UserContext";
import { useFormik } from "formik";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import './loginandsignup.css'
function SignUp() {
    const { setUser,setApplications } = useContext(UserContext)
    const [showPassword,setShowPassword] = useState(false);
    const fromSchema = yup.object().shape({
        name: yup.string().required('Name is Required!'),
        username: yup.string().required('Username is Required!'),
        password: yup.string().required("Password Is Required!"),
        confirmationPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    })

    const navagate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            confirmationPassword: ''
        },
        validationSchema: fromSchema,
        onSubmit: (values, {setErrors,setSubmitting}) => {
            const formJson = {
                'name': values.name,
                'username': values.username,
                'password': values.password
            }
            fetch('/signup', {
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
                            setApplications(user.applications)
                            navagate('/')
                        })
                    
                    }else{
                        r.json().then(error=>setErrors({username:error.error}))
                    }
                    setSubmitting(false)
                })
        }
    })


    return (
        <>
          <NavBar />
          <div className="container">
            <div className="card">
            <h1 className="title">ApplyWise SignUp</h1>
            <form onSubmit={formik.handleSubmit}>
            <label className="label">Name</label>
                <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Enter Name" 
                    className="input"/>
                <p className="error">{formik.errors.name}</p>
                <label className="label">Username</label>
                <input
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="Enter Username"
                    className="input"
                />
                <p className="error">{formik.errors.username}</p>
                <label className="label">Password</label>
                <input
                    name="password"
                    type={showPassword?'text': 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter Password"
                    className="input" />
                    <p className="error">{formik.errors.password}</p>
                    <label className="label">Confirm Password</label>
                <input
                    name="confirmationPassword"
                    type={showPassword?'text': 'password'}
                    value={formik.values.confirmationPassword}
                    onChange={formik.handleChange}
                    placeholder="Confirm Password" 
                    className="input"/>
                <p className="error">{formik.errors.confirmationPassword}</p>
                <label>
                    <input 
                    type="checkbox"
                    checked={showPassword}
                    onChange={()=>setShowPassword(!showPassword)}
                    />
                    {showPassword ? 'Hide Password' : 'Show Password'}
                </label>
                <button className="button" type="submit">Sign Up</button>
            </form>
            </div>
        </div>

        </>
    )
}

export default SignUp