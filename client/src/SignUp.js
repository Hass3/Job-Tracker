import { useState, useEffect } from "react";
import { useFormik } from 'formik';


const Signup = ()=>{

    return(
        <>
        <form>
            <input placeholder="Enter Name"/>
            <input placeholder="Enter Username"/>
            <input placeholder="Enter Password"/>

        </form>
        </>
    )
}

export default Signup