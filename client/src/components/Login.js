import { useState, useContext } from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import './loginandsignup.css'
function Login() {
    const [showPassword,setShowPassword] = useState(false)
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
                            navagate('/')
                        })
                    }
                })
        }
    })

    return (
        <>
            <NavBar />
        <div className="container">
            
            <div className="card">
            <h1 className="title">ApplyWise Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <label className="label">Username</label>
                <input name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Enter Username" 
                    className="input"/>
               <p className="error">{formik.errors.username}</p>
                <label className="label">password</label>
                <input name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter Password"
                    className="input" />
                <p className="error">{formik.errors.password}</p>
                <label>
                    <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={()=>setShowPassword(!showPassword)}/>
                    {showPassword? 'Hide Password': "Show Password"}
                </label>
                
                <button className="button" type="submit">Login</button>
              
            </form>
            </div>
        </div>
        </>
    )


}

export default Login