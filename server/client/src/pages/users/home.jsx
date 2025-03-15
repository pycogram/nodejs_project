import { useContext, useEffect, useState } from "react";
import { deleteUserPost, getPost } from "../../controllers/postControllers";
import { PostContext } from "../../contexts/postContexts";
import JustPost from "../../components/post";
import { Link } from "react-router-dom";
import Success from "../../components/success";
import { UserContext } from "../../contexts/userContexts";

const Home = () => {
    // use post context
    const {post, setPost} = useContext(PostContext);
    //const { post, setPost } = useContext(PostContext) || { post: [], setPost: () => {} };

    const [getNotifyUpdateMsg, setGNUM] = useState(location.state ?? "");

    const {user} = useContext(UserContext);
    
    setTimeout(() => {
        setGNUM("");
    }, 4000);

    // setup loading state
    const [loadingLogo, setLoadingLogo] = useState(true);

    useEffect(() => {
    
        setTimeout( async () => {
            try {
                // get all the post from db
                const {data} = await getPost();

                // update post state
                setPost(data);

            } catch (error) {

                console.log(error.message + "....");
                setPost([]);

            } finally {

                // unset loading state
                setLoadingLogo(false);
            }
        }, 1000);

    }, []);

    const handleDelete = (_id) => {
        
        setLoadingLogo(true);

        setTimeout(async () => {
            try{

                await deleteUserPost(_id);
    
                // set post
                const newPost = post.filter(item => item._id !== _id);
                setPost(newPost);
    
                // notify user
                setGNUM("Post deleted");
    
            } catch(error) {
                console.log(error.message);

            } finally {
                setLoadingLogo(false);
            }
        }, 1000);
    }

    return ( 
        <div className="grid justify-center">
                {! loadingLogo && <h2 className="text-center">Post Feed</h2>}
                {
                    getNotifyUpdateMsg && ! loadingLogo ? <Success getSuccessStatus={getNotifyUpdateMsg} /> : ""
                }
                {
                    loadingLogo && <i className="fa-solid fa-spinner text-center text-5xl text-blue-500 animate-spin mt-12"></i>
                }
                {
                    ! loadingLogo && post.map((eachPost) => 
                    //post && post.map((eachPost) => 
                        <div key={eachPost._id}>
                            <JustPost postData={eachPost}>
                                <div className="block gap-x-0.5 text-blue-400">
                                    {   
                                        user?.email === eachPost?.user_id?.email && <Link to={"/updatepost"} state={eachPost} title="Edit" className="fa-solid fa-pen-to-square nav-link" />
                                    }
                                    { 
                                        user?.email === eachPost?.user_id?.email && <button onClick={() => handleDelete(eachPost._id)} className="fa-solid fa-trash nav-link" title="Delete"></button> 
                                    }
                                    {
                                        user?.email !== eachPost?.user_id?.email && <button className="fa-solid fa-bug nav-link" title="Report"></button>
                                    }
                                    {
                                        user?.email !== eachPost?.user_id?.email && <button className="fa-solid fa-heart nav-link" title="React"></button>
                                    }
                                </div> 
                            </JustPost>
                        </div>
                    )
                }
                {
                    post.length === 0 && loadingLogo === false 
                        ? <h2 className="text-center mt-12">No post found!</h2> 
                        : ""
                }
        </div>
     );
}
 
export default Home;