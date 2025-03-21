import { useContext } from "react";
import NavBar from "./NavBar";
import { UserContext } from "../UserContext";
import { useFormik } from "formik";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";

function SignUp() {
    const { user, setUser } = useContext(UserContext)

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
        onSubmit: (values) => {
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
                            navagate('/companies')
                        })
                    }
                })
        }
    })


    return (
        <>
            <NavBar />
            <form onSubmit={formik.handleSubmit}>
                <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Enter Name" />

                <input
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="Enter Username"
                />
                <input
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter Password" />
                <input
                    name="confirmationPassword"
                    value={formik.values.confirmationPassword}
                    onChange={formik.handleChange}
                    placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>
                <p>{formik.errors.name}</p>
                <p>{formik.errors.username}</p>
                <p>{formik.errors.password}</p>
                <p>{formik.errors.confirmationPassword}</p>
            </form>

        </>
    )
}

export default SignUp