const Alert = ({getError}) => {
    const error =  getError;
    return ( 
        <div className="error-notify md:w-118">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
        </div>
     );
}
 
export default Alert;