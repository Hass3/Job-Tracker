import Signup from "./components/SignUp";
import Login from "./components/Login";
import CompaniesPage from "./components/CompaniesPage";
import Home from "./components/Home";

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
        element:<Signup/>
    }, 
    {
        path:'/compaines',
        element:<CompaniesPage/>
    }, 

]


export default routes