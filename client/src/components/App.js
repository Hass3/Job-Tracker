
import { UserProvider } from "../UserContext";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import SignUp from "./SignUp";
import Login from "./Login";


function App(){
    
    return(
        <>
            <NavBar />
            <Home />
            <Login />
            <SignUp />
            <CompaniesPage />
        </>
   
    )
}

export default App