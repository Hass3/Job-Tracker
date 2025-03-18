import { useState, useEffect } from "react";
import { useFormik } from 'formik';


function Signup(){

    return(
        <>
        <form>
            <input placeholder="Enter Name"/>
            <input placeholder="Enter Username"/>
            <input placeholder="Enter Password"/>
            <button>Sign Up</button>
        </form>
        </>
    )
}

export default Signup