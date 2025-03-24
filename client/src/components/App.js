
import NavBar from "./NavBar";
import CompaniesPage from "./companies/CompaniesPage";
import SignUp from "./SignUp";
import Login from "./Login";
import JobDetails from "./jobs/JobDetails";
import CompanyCard from "./companies/CompanyCard";
import CompanyDetails from "./companies/CompanyDetails";
import CompanyJobs from "./companies/CompanyJobs";


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