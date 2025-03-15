const JustPost = ({postData, children}) => {
    
    return ( 
        <div className="cardUser my-1">
            <div>
                {
                    postData ?. user_id ?. email && <h4>Account: {postData.user_id.email}</h4>
                }
                <h4>Title: {postData.title}</h4>
                <h4>Body: {postData.body}.</h4>
                <p className="text-fuchsia-400 font-thin text-xs mt-1.5">{new Date(postData.createdAt).toDateString()}</p>
            </div>
            <div className="w-full flex justify-end">
                {children}
            </div>
        </div>
     );
}
 
export default JustPost;