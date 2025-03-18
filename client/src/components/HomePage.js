import { Link } from "react-router-dom";
import CompaniesPage from "./CompaniesPage";



function HomePage({user}) {
  return (
   <>
  {user?(
  <>
  <h2>Welcome Back,{user.name} </h2>
  </>
  ) :
    (
    <>
    <h2>Please Login in Or Sign Up</h2>  
    </>
    )
  }
   </> 

  )
}

export default HomePage;
