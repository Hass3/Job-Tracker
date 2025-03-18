import HomePage from "./components/HomePage";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import CompaniesPage from "./components/CompaniesPage";

const routes = [
    {
        path: '/',
        element:<HomePage/>
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