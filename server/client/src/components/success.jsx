const Success = ({getSuccessStatus}) => {
    const success =  getSuccessStatus;
    return ( 
        <div className="success-notify md:w-118">
            <i className="fa-solid fa-thumbs-up"></i>
            <p>{success}</p>
        </div>
     );
}
 
export default Success;