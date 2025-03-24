
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import SignUp from "./SignUp";
import Login from "./Login";
import JobDetails from "./JobDetails";
import CompanyCard from "./CompanyCard";
import CompanyDetails from "./CompanyDetails";
import CompanyJobs from "./CompanyJobs";


function App(){
    
    return(
        <>
            <NavBar />
            <Home />
            <Login />
            <SignUp />
            <CompaniesPage />
            <JobDetails/>
            <CompanyCard/>
            <CompanyDetails/>
            <CompanyJobs/>
        </>
   
    )
}

export default App