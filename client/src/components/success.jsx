const Success = ({getSuccessStatus}) => {
    const success =  getSuccessStatus;
    return ( 
        <div className="success-notify">
            <i className="fa-solid fa-thumbs-up"></i>
            <p>{success}</p>
        </div>
     );
}
 
export default Success;