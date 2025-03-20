
import { useContext, useEffect, useState } from "react"
import Login from "./Login"
import Signup from "./SignUp"
import NavBar from "./NavBar"
import CompaniesPage from "./CompaniesPage"
import { UserContext } from "../UserContext"

function Home(){
    const {user, setUser}= useContext(UserContext)
    
    return(
       <>
         <NavBar />
         {
        !user ? (
          <>
         <h1>Hello And Welcome to Apply wise an organizer To keep track of all your Job Applications </h1>
        
            
            <h2>please Login or sign up</h2>
            </>
          )
          :(
            <>
            <h1>{user.name}, Please Choose your Option</h1>
             
            </>
          )
         }

       </>
      )






}

export default Home 