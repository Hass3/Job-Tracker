
import { useContext, useEffect, useState } from "react"
import NavBar from "./NavBar"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"

function Home() {
  const { user, setUser } = useContext(UserContext)
  

  return (
    <>
     
      {
        !user ? (
          <>
            <h1>Hello And Welcome to Apply wise an organizer To keep track of all your Job Applications </h1>
            <h2>please Login or sign up</h2>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/signup'><button>Sign Up</button></Link>
          </>
        )
          : (
            <>
             <NavBar />
              <h1>{user.name}, Please Choose your Option</h1>
              

            </>
          )
      }

    </>
  )






}

export default Home 