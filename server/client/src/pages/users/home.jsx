import { useContext, useEffect, useState } from "react";
import { getPost } from "../../controllers/postControllers";
import { PostContext } from "../../contexts/postContexts";
import JustPost from "../../components/post";
import { Link } from "react-router-dom";

const Home = () => {

    // use post context
    const {post, setPost} = useContext(PostContext);

    // setup loading state
    const [loadingLogo, setLoadingLogo] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            try{
                // get all the post from db
                const {data} = await getPost();

                // update post state
                setPost(data);

                // unset loading state
                setLoadingLogo(false);
            } catch(error) {
                // console.log(error.message + "....");
                setPost([]);
                setLoadingLogo(false);
            }
        }, 1000)

    }, []);
    return ( 
        <div className="grid justify-center">
                {! loadingLogo && <h2 className="text-center">Post Feed</h2>}
                {
                    loadingLogo && <i className="fa-solid fa-spinner text-center text-5xl text-blue-500 animate-spin mt-12"></i>
                }
                {
                    ! loadingLogo && post.map((eachPost) => 
                    //post && post.map((eachPost) => 
                        <div key={eachPost._id}>
                            <JustPost getPost={eachPost}>
                                <div className="flex gap-x-0.5 text-blue-400">
                                    <Link title="Edit" className="fa-solid fa-pen-to-square nav-link" />
                                    <button className="fa-solid fa-trash nav-link" title="Delete"></button>
                                    <button className="fa-solid fa-bug nav-link" title="Report"></button>
                                    <button className="fa-solid fa-heart nav-link" title="React"></button>
                                </div> 
                            </JustPost>
                        </div>
                    )
                }
                {
                    post.length === 0 && loadingLogo === false 
                        ? <h2 className="text-center mt-12">No post found</h2> 
                        : ""
                }
        </div>
     );
}
 
export default Home;