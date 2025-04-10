
import { Link } from "react-router-dom"
import './home.css';
function Home() {
  

  return (
    <div className="contaniner">
     
    
          <div className="welcome-section">
             <h1 className="home-h1">Welcome to ApplyWise!</h1>
             <p className="home-p">An organizer to keep track of all your job applications.</p>
             <h2 className="home-h2">Please Login or Sign Up</h2>
            <div className="button-container">
            <Link to='/login'><button className="user-buttons">Login</button></Link>
            <Link to='/signup'><button className="user-buttons">Sign Up</button></Link>
            </div>
          </ div>
        
    </div>
  )






}

export default Home 