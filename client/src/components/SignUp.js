import { useState, useEffect, useContext } from "react";
import { useFormik } from 'formik';
import NavBar from "./NavBar";
import { UserContext } from "../UserContext";
function SignUp(){
    const {user, setUser} = useContext(UserContext)
    return(
        <>
        <NavBar/>
        <form>
            <input placeholder="Enter Name"/>
            <input placeholder="Enter Username"/>
            <input placeholder="Enter Password"/>
            <button>Sign Up</button>
        </form>
        </>
    )
}

export default SignUp