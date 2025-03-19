import {NavLink} from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../UserContext"
function NavBar(){
  const user = useContext(UserContext)
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
          <button className="navLink">Logout</button>
        
        </>
        )
        }
        </nav>
        
        </>
    )
}
export default NavBar