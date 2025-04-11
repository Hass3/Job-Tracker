import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CompaniesPage from "./components/companies/CompaniesPage";
import Home from "./components/Home";
import CompanyDetails from "./components/companies/CompanyDetails";
import JobDetails from "./components/jobs/JobDetails";
import JobsPage from "./components/jobs/JobsPage";
import UserJobDetails from "./components/jobs/UserJobDetails";
import ProtectedRoute from "./ProtectedRoute";


const routes = [
    { path: '/', element:<Home/>},

    { path:'/login', element:<Login/>},

    {path:'/signup',element:<SignUp/>},

    {
        path:'/companies',
        element:<ProtectedRoute><CompaniesPage/></ProtectedRoute>
    }, 
    {
        path:'/companies/:id',
        element:<ProtectedRoute><CompanyDetails/></ProtectedRoute>
    },
    {
        path:'/jobs/:id',
        element:<ProtectedRoute><JobDetails/></ProtectedRoute>
    },
    {
        path:'/jobs',
        element:<ProtectedRoute><JobsPage/></ProtectedRoute>
    },
    {
        path:'/job/:id',
        element:<ProtectedRoute><UserJobDetails/></ProtectedRoute>
    }

]


export default routes