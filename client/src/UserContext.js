import React, { useState } from "react";
import { useEffect } from "react";
const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [companies, setCompanies] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [applications, setApplications] = useState([])
  const [job, setJob] = useState(null)

  useEffect(() => {
    fetch('/current_user').then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setApplications(user.applications)
        })
      }
      else {
        setUser(null)
        setApplications([])
      }
    })
  }, [])

  useEffect(()=>{
    fetch('/companies')
    .then(r=>r.json())
    .then(companies=> setCompanies(companies))
  }, [])


 const onDeleteCompany=(deletedComapny)=>{
   const updatedCompanies = companies.filter(c=>c.id !==deletedComapny.id)
   setCompanies(updatedCompanies)
 }

 const onAddJob = (newJob)=>{
  setJobs([...jobs,newJob])
}

const onAddApplication = (newA)=>{
  setApplications([...applications,newA])
}
  

  const contextValue ={
    user,
    setUser,
    companies, 
    setCompanies,
    onDeleteCompany,
    jobs,
    setJobs, 
    onAddJob,
    onAddApplication,
    applications,
    setApplications,
    job,
    setJob


  }
  


  
  return <UserContext.Provider value={contextValue}>{children} </UserContext.Provider>


}

export { UserContext, UserProvider }