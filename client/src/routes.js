import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CompaniesPage from "./components/CompaniesPage";
import Home from "./components/Home";
import CompanyDetails from "./components/CompanyDetails";
import JobDetails from "./components/JobDetails";

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
    }

]


export default routes