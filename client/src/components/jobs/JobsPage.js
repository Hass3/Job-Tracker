import JobApplicaionCard from "./JobApplicationCard";
import { useContext, useState } from "react";
import NavBar from "../NavBar";
import { UserContext } from "../../UserContext";




function JobsPage(){
    const {user, applications}=useContext(UserContext)
   
    const sortedApplications = [...applications].reverse()
    if (!user ){return <h1>Loading ...</h1>}
    console.log(applications)
    return(
    <>
    <NavBar/>
    <h1>Hello {user.name} these are all the jobs that you have appiled to. Feel free to edit or delete an application as needed.</h1>
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