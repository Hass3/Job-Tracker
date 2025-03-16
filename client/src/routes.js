import HomePage from "./components/HomePage";
import Signup from "./components/SignUp";
import Login from "./components/Login";

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
    }
]


export default routes