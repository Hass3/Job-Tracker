import { useState, useEffect } from "react"
import { useFormik } from 'formik';

const Login = ()=>{

    return(
        <>
        <form>
            <input placeholder="Enter Username"/>
            <input placeholder="Enter Password"/>
            <button>Login</button>
        </form>
        </>
    )


}

export default Login