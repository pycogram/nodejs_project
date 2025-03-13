import { useContext, useEffect, useState } from "react";
import { deleteUserPost, getUserPost } from "../../controllers/postControllers";
import { PostContext } from "../../contexts/postContexts";
import JustPost from "../../components/post";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Success from "../../components/success";

const Dashboard = () => {
    const location = useLocation();
    const [getNotifyUpdateMsg, setGNUM] = useState(location.state ?? "");

    setTimeout(() => {
        setGNUM("");
    }, 4000);

    const navigate = useNavigate();

    if(!localStorage.getItem('email') && !localStorage.getItem('token')){
        navigate('/login', {state: {message: "Error occured, Pls login again."}});
    }

    const {post, setPost} = useContext(PostContext);
    const [loadingLogo, setLoadingLogo] = useState(true);

    useEffect(() => {
        setTimeout( async () => {
            try{
                const {data} = await getUserPost();
                setPost(data);
                setLoadingLogo(false);

            } catch(error) {
                // console.log(error.message + "....");
                setPost([]);
                setLoadingLogo(false);
            }
        }, 1000);
    }, []);

    const handleDelete = async (_id) => {
        try{
            // Delete user post
            await deleteUserPost(_id);

            // set post
            const newPost = post.filter(item => item._id !== _id);
            setPost(newPost);

            // notify user
            setGNUM("Post deleted");

        } catch(error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="grid justify-center">
            {! loadingLogo && <h2 className="text-center mt-4">{localStorage.getItem('email')}'s Account</h2>}
            {
                getNotifyUpdateMsg && ! loadingLogo ? <Success getSuccessStatus={getNotifyUpdateMsg} /> : ""
            }
            {
                loadingLogo && <i className="fa-solid fa-spinner text-center text-5xl text-blue-500 animate-spin mt-12"></i>
            }
            {
                ! loadingLogo && post.map(eachPost => <div key={eachPost._id}> 
                     <JustPost postData={eachPost} > 
                        <div className="flex gap-x-0.5 text-blue-400">
                            <Link to={"/updatepost"} state={eachPost} title="Edit" className="fa-solid fa-pen-to-square nav-link" />
                            <button className="fa-solid fa-trash nav-link" title="Delete" onClick={() => handleDelete(eachPost._id)}></button> 
                        </div> 
                    </JustPost>
                </div>)
            }
            {
                post.length === 0 && loadingLogo === false 
                    ? <h2 className="text-center mt-12">No post found</h2> 
                    : ""
            }
        </div>
     );
}
 
export default Dashboard;