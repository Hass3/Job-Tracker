import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({childeren}){
const {user} = useContext(UserContext)

if (!user){
    return <Navigate to="/login" replace />
}

return childeren
}

export default ProtectedRoute