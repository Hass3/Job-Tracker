
import { useContext, useEffect, useState } from "react"
import NavBar from "./NavBar"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"
import './home.css';
function Home() {
  const { user, setUser } = useContext(UserContext)
  

  return (
    <div className="contaniner">
     
      {
        !user ? (
          <div className="welcome-section">
             <h1 className="home-h1">Welcome to ApplyWise!</h1>
             <p className="home-p">An organizer to keep track of all your job applications.</p>
             <h2 className="home-h2">Please Login or Sign Up</h2>
            <div className="button-container">
            <Link to='/login'><button className="user-buttons">Login</button></Link>
            <Link to='/signup'><button className="user-buttons">Sign Up</button></Link>
            </div>
          </ div>
        )
          : (
            <div className="user-section">
             <NavBar />
              <h1>{user.name}, Please Choose your Option</h1>
              

            </div>
          )
      }

    </div>
  )






}

export default Home 