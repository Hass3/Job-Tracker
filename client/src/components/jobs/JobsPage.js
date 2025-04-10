import JobApplicaionCard from "./JobApplicationCard";
import { useContext } from "react";
import NavBar from "../NavBar";
import { UserContext } from "../../UserContext";




function JobsPage(){
    const {user, applications}=useContext(UserContext)
   
    const sortedApplications = [...applications].reverse()
    if (!user) return <h1>Loading...</h1>

    return(
    <>
    <NavBar/>
    
    <h1>Welcome Back {user.name}, Here are all the Jobs you've applied to. Feel free to click one for more Info and options</h1>
    <div className="application-container">

    {
        sortedApplications.map(a=>
            <JobApplicaionCard
            key={a.id}
            a={a}
            />
        
        )
    
    }
    </div>
    </>
 )

}



export default JobsPage