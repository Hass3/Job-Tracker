import { BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import { UserProvider } from "../UserContext";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import SignUp from "./SignUp";
import Login from "./Login";


function App(){

    return(
        <UserProvider>
         <Router>
            <NavBar />
         </Router>
         <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/signup" element ={<SignUp/>}/>
            <Route path="/compaines" element ={<CompaniesPage/>}/>
         </Routes>
        </UserProvider>
    )
}

export default App