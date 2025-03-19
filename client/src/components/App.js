
import { UserProvider } from "../UserContext";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import SignUp from "./SignUp";
import Login from "./Login";
import { useState } from "react";


function App(){
    
    return(
        <UserProvider>
            <NavBar />
            <Home />
            <Login />
            <SignUp />
            <CompaniesPage />
        </UserProvider>
    )
}

export default App