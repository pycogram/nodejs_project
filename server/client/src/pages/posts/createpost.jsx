import { useContext, useState } from "react";
import { createUserPost, updateUserPost } from "../../controllers/postControllers";
import { PostContext } from "../../contexts/postContexts";
import Alert from "../../components/alert";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePost = () => {

    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState("");

    const [error, setError] = useState("");

    const {post, setPost} = useContext(PostContext);
    

    const navigate = useNavigate();

    const handleCreatePost = async (e) => {
        e.preventDefault();

        // set Error set
        setError("");

        try{
            // create user post
            const {data} = await createUserPost(title, body);

            // set post state
            setPost([...post, data]);

            // navigate to dashboard
            navigate('/dashboard', {state: "Post created!"})

        } catch(error){
            setError(error.message);
        }
    }
    
    return ( 
        <div className="card">
            <h2 className="mb-2"> Create Post</h2>
            {error && < Alert getError={error}/>}
            <form onSubmit={handleCreatePost}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input"/>
                <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" rows={"5"} className="input"></textarea>
                <button className="btn">Create</button>
            </form>
        </div>
     );
}
 
export default CreatePost;