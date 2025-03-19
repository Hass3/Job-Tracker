
import { useContext, useEffect, useState } from "react"
import Login from "./Login"
import Signup from "./SignUp"
import NavBar from "./NavBar"
import CompaniesPage from "./CompaniesPage"
import { UserContext } from "../UserContext"

function Home(){
    const {user, setUser}= useContext(UserContext)

    useEffect(()=>{
      fetch('/current_user').then((r)=>{
        if(r.ok){
          r.json().then((user)=> setUser(user))
        }
      })
    },[])

    return(
       <>
         <NavBar user = {user} setUser = {setUser}/>
         <h1>Hello And Welcome to Apply wise an organizer To keep track of all your Job Applications </h1>
         {
          !user ? (
            <>
            <h2>please Login or sign up</h2>
            </>
          )
          :(
            <>
            <h2>Welcome back {user.name}</h2>
            <CompaniesPage />
            </>
          )
         }

       </>
      )






}

export default Home 