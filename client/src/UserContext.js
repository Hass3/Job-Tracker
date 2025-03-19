import React, { useState } from "react";


const UserContext = React.createContext();


function UserProvider({children}){
    
    return <UserContext.Provider value={null}>{children} </UserContext.Provider>
}

export {UserContext,UserProvider}