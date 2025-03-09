import { useContext } from "react";
import { UserContext } from "../contexts/userContexts";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
    const {user} = useContext(UserContext);
    console.log(user);
    return ( 
        ! user.email ? <Outlet /> : <Navigate to={'/dashboard'} />
    );
}
 
export default GuestRoutes;