import {NavLink} from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"
function NavBar(){
  const {user ,setUser} = useContext(UserContext)
   
  const logOut = ()=>{
    fetch('/logout', {
      method: 'POST', 
      headers:{"Content-Type": "application/json"}
    }).then(r=> {
      if(r.ok){
       setUser(null)
    }})
  }

    return(
        <>
        <nav className="navbar">
        {!user ?(
        <>
          <NavLink 
          to='/'
          className='navlink'
          >
           Home
          </NavLink>

          <NavLink 
          to='/login'
          className='navlink'
          >
            Login
          </NavLink>
          <NavLink 
          to='/signup'
          className='navlink'
          >
            Sign Up
          </NavLink>
        </>
        )
        :
        (<>
          <NavLink 
          to='/'
          className='navlink'
          >
           Home
          </NavLink>
          <button onClick={logOut} className="navLink">Logout</button>
        </>
        )
        }
        </nav>
        
        </>
    )
}
export default NavBar