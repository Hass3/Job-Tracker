import { UserContext } from "./UserContext";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children }){
const {user,loading} = useContext(UserContext)
const navigate = useNavigate()
useEffect(() => {
    if (!loading && !user) {
        navigate("/login");
    }
}, [user, loading, navigate]);


if (loading) return <h2>Loading...</h2>;
if(!user)return null


return children 
}

export default ProtectedRoute