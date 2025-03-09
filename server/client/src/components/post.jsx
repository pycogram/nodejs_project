const JustPost = ({getPost, children}) => {
    
    return ( 
        <div className="cardUser my-1">
            <span>
                {
                    getPost.user_id.email && <h4>Account: {getPost.user_id.email}</h4>
                }
                <h4>Title: {getPost.title}</h4>
                <h4>Body: {getPost.body}.</h4>
                <p className="text-fuchsia-400 font-thin text-xs mt-2.5">{new Date(getPost.createdAt).toDateString()}</p>
            </span>
            <span>
                {children}
            </span>
        </div>
     );
}
 
export default JustPost;