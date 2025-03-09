import { useContext, useState } from "react";
import Alert from "../../components/alert";
import { loginUser } from "../../controllers/userControllers";
import { UserContext } from "../../contexts/userContexts";
import { useNavigate, useLocation } from "react-router-dom";
import Success from "../../components/success";

const Login = () => {
    // use usercontext
    const {user, setUser} = useContext(UserContext);
    console.log(user);

    const location = useLocation();
    const regInfo = location.state ?? "";

    // Error state
    const [error, setError] = useState("");
    
    // Success state
    const [successStatus, setSuccessStatus] = useState(regInfo.message);

    // Input state
    const [email, setEmail] = useState(regInfo.email);
    const [password, setPassword] =  useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessStatus("");

        try{
            // login user
            const data = await loginUser(email, password);

            //update user state
            setUser({
                email,
                post: []
            });

            navigate('/dashboard');

        } catch(err){
            setError(err.message);
        }
    }

    return ( 
        <section className="card">
            <h1 className="title">Login</h1>
            {error && < Alert getError={error}/>}
            {successStatus && < Success getSuccessStatus={successStatus}/>}
            <form onSubmit={handleLogin}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="input"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input"/>
                <button className="btn">Login</button>
            </form>
        </section>
     );
}
 
export default Login;