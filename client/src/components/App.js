
import { useEffect, useState } from "react"
import HomePage from "./HomePage"
import Login from "./Login"
import Signup from "./SignUp"
function App(){
    const [user, setUser] = useState(null)

    useEffect(()=>{
      fetch('/current_user').then((r)=>{
        if(r.ok){
          r.json().then((user)=> setUser(user))
        }
      })
    })



    return(
       <>

         <HomePage/>
       </>
      )






}

export default App 