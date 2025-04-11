
import { useContext } from "react";
import NavBar from "../NavBar";
import { UserContext } from "../../UserContext";
import JobCards from "./JobCards";




function JobsPage(){
    const {user,userJobs}=useContext(UserContext)

  
    return(
    <>
    <NavBar/>
    
    <h1>Welcome Back {user.name}, Here are all the Jobs you've applied to. Feel free to click one for more Info and options</h1>
    <div className="job-container">
    
    {
        userJobs.map(j=>
            <JobCards
            key={j.id}
            j={j}
            />
        
        )
    
    }
    </div>
    </>
 )

}



export default JobsPage