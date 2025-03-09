import { useContext, useState } from "react";
import Alert from "../../components/alert";
import { registerUser } from "../../controllers/userControllers";
import { UserContext } from "../../contexts/userContexts";
import { useNavigate } from "react-router-dom";

const Register = () => {

   // use usercontext
   const {user, setUser} = useContext(UserContext);
   console.log(user);

    // Error state
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirm_password: ""
    }) 

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setError("");

        try{
            // register user
            const data = await registerUser(formData);

            // update user state
            setUser({
                email: formData.email,
                posts: []
            });

            const {email, message} = data;
            navigate('/login', {state: {email, message}});

        } catch(err){
            setError(err.message);
        }
    }

    return ( 
        <section className="card">
            <h1 className="title">Register</h1>
            {error && < Alert getError={error}/>}
            <form onSubmit={handleLogin}>
                <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="Email Address" className="input" autoFocus/>
                <input value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" placeholder="Password" className="input"/>
                <input value={formData.confirm_password} onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} type="password" placeholder="Confirm Password" className="input"/>
                <button className="btn">Register</button>
            </form>
        </section>
     );
}
 
export default Register;