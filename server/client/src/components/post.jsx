const JustPost = ({postData, children}) => {
    
    return ( 
        <div className="cardUser my-1">
            <span>
                {
                    postData ?. user_id ?. email && <h4>Account: {postData.user_id.email}</h4>
                }
                <h4>Title: {postData.title}</h4>
                <h4>Body: {postData.body}.</h4>
                <p className="text-fuchsia-400 font-thin text-xs mt-2.5">{new Date(postData.createdAt).toDateString()}</p>
            </span>
            <span>
                {children}
            </span>
        </div>
     );
}
 
export default JustPost;