import { useContext, useState } from "react";
import { createUserPost, updateUserPost } from "../../controllers/postControllers";
import { PostContext } from "../../contexts/postContexts";
import Alert from "../../components/alert";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePost = () => {

    const location = useLocation();
    const postInfo = location.state ?? "";

    const [title, setTitle] = useState(postInfo.title); 
    const [body, setBody] = useState(postInfo.body);

    const [error, setError] = useState("");

    const {post, setPost} = useContext(PostContext);
    

    const navigate = useNavigate();

    const handleUpdatePost = async (e) => {
        e.preventDefault();

        // set Error set
        setError("");

        try{
            // update user post
            const {data} = await updateUserPost({_id: postInfo._id, title, body});

            // set post state
            setPost([...post, {_id: postInfo._id, title, body}]);

            // navigate to dashboard
            navigate('/dashboard', {state: "Post updated!"})

        } catch(error){
            setError(error.message);
        }
    }
    
    return ( 
        <div className="card">
            <h2 className="mb-2"> Update Post </h2>
            {error && < Alert getError={error}/>}
            <form onSubmit={handleUpdatePost}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input"/>
                <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" rows={"5"} className="input"></textarea>
                <button className="btn">Update</button>
            </form>
        </div>
     );
}
 
export default UpdatePost;