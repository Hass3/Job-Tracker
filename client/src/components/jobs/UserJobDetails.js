import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import NavBar from "../NavBar"

import ApplicationCard from "./ApplicationCard"
import { UserContext } from "../../UserContext"


function UserJobDetails() {
    const [job,setJob] = useState(null)
    const [applications,setApplications] = useState([])
    const{userJobs,setUserJobs} = useContext(UserContext)

    const parms = useParams()
    const jobId = parms.id
    const navigate = useNavigate()
    
    useEffect(()=>{
      fetch(`/job/${jobId}`)
      .then(r=>r.json())
      .then(j=>{
        setJob(j)
        setApplications(j.applications)
      }
    )
    },[])


    const onDeleteApplication = (deletedA) => {
        const updatedApplications = applications.filter(a => a.id !== deletedA.id)
        setApplications(updatedApplications)

        if (updatedApplications.length === 0) {
            setUserJobs(userJobs.filter(j => j.id !== job.id));
            navigate('/jobs')
          }
    }

    const onEditApplication = (updatedA) => {
        const updatedApplications = applications.map(a => {
            if (a.id == updatedA.id) {
                return updatedA
            } else {
                return a
            }
        })
        setApplications(updatedApplications)
    }


    if (!job) { return <h1>Loading...</h1> }
    const{title,salary,location,description} = job 
    return (
        <>
           <NavBar />
      <div className="details-container">
        <Link to="/jobs">
          <button className="back-btn">Back</button>
           </Link>
            <div className="job-info">
                <h3 >{title}</h3>
                <h4><strong>Salary:</strong>💰${salary}</h4>
                <h4><strong>Location:</strong>{location}</h4>
                <h4><strong>Description:{description}</strong></h4>
                <h4><strong>Company:</strong>{job.company.name}</h4>
                <div >
                
                </div>

                <h2>Applications: </h2>
                <div className="applications-container">
                {
                 applications.map(a=>
                    <ApplicationCard key={a.id} a={a} onEditApplication={onEditApplication} onDeleteApplication={onDeleteApplication}  />
                 )
                }
                </div>
            </div>
            </div>
            
        </>



    )


}


export default UserJobDetails


