import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContexts";

const Layout = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = () => {
        
        if(confirm('Do you want to logout?')){
            // localStorage.clear();
            
            localStorage.removeItem('token');
            localStorage.removeItem('email');

            setUser({email: null, post: []});
            navigate('/login');
        }
    }
    return ( 
        <>
            <header className="bg-indigo-500 text-white fixed top-0 w-full">
                <nav className="flex items-center justify-between p-4 md:px-20 ">
                    <Link to={"/"} title="Home" className="fa-solid fa-house-chimney nav-link"/>
                    <h2 className="text-xl font-bold cursor-pointer text-center">SocialPost</h2>
                    <div className="flex items-center gap-2">
                        {user.email && <Link to={"/createpost"} title="Add Post" className="fa-solid fa-circle-plus nav-link"/>}
                        {user.email && <Link to={"/dashboard"} title="Dashboard" className="fa-solid fa-table-columns nav-link"/>}
                        {!user.email ? (<Link to={"/login"} title="Login" className="fa-solid fa-right-to-bracket nav-link"/>) : (<span title="Logout" onClick={logOut} className="fa-solid fa-right-to-bracket nav-link"/>)}
                        {!user.email && <Link to={"/register"} title="Register" className="fa-solid fa-user-plus nav-link"/>}
                    </div>
                </nav>
            </header>

            <main className="px-4 pt-25 pb-10">
                <Outlet />
            </main>
        </>
     );
}
 
export default Layout;