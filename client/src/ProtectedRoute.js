import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children }){
const {user,loading} = useContext(UserContext)
const navigate = useNavigate()
if (loading) return <h2>Loading...</h2>

if (!user) navigate('/login')



return children 
}

export default ProtectedRoute