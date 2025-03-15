import { Link } from 'react-router-dom'



const HomePage = ()=> {
  return (
   <>
   <h1>Hello and welcome to apply wise. Apply wise is a Job application tracker that 
    helps you orgainze all of your job applications.</h1>
    <Link to='/login'>
    <button>Login</button>
    </Link>
    <button>Signup</button>

   </> 

  )
}

export default HomePage;
