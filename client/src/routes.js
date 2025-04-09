import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CompaniesPage from "./components/companies/CompaniesPage";
import Home from "./components/Home";
import CompanyDetails from "./components/companies/CompanyDetails";
import JobDetails from "./components/jobs/JobDetails";
import JobsPage from "./components/jobs/Jobs";

const routes = [
    {
        path: '/',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    }, 
    {
        path:'/companies',
        element:<CompaniesPage/>
    }, 
    {
        path:'/companies/:id',
        element:<CompanyDetails/>
    },
    {
        path:'/jobs/:id',
        element:<JobDetails/>
    },
    {
        path:'/jobs',
        element:<JobsPage/>
    }

]


export default routes