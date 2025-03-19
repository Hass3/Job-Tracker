
import { UserProvider } from "../UserContext";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import SignUp from "./SignUp";
import Login from "./Login";
import { useState } from "react";


function App(){
    const [user, setUser]= useState(null)
    return(
        <UserProvider>
            <NavBar />
            <Home user={user} setUser = {setUser}/>
            <Login setUser = {setUser}/>
            <SignUp setUser = {setUser}/>
            <CompaniesPage  user={user}/>
        </UserProvider>
    )
}

export default App