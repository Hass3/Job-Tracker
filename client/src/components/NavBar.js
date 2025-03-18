import {NavLink} from "react-router-dom"

function NavBar({user, setUser}){
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