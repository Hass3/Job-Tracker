import React, { useState } from "react";
import { useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [companies, setCompanies] = useState(null)
  useEffect(() => {
    fetch('/current_user').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
      else {
        setUser(null)
      }
    })
  }, [])

  useEffect(()=>{
    fetch('/companies')
    .then(r=>r.json())
    .then(companies=> setCompanies(companies))
  }, [])

  const contextValue ={
    user,
    setUser,
    companies, 
    setCompanies
  }
  


  
  return <UserContext.Provider value={contextValue}>{children} </UserContext.Provider>


}

export { UserContext, UserProvider }