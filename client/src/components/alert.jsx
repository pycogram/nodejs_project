const Alert = ({getError}) => {
    const error =  getError;
    return ( 
        <div className="error-notify">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{error}</p>
        </div>
     );
}
 
export default Alert;