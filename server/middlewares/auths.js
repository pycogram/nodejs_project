import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const auth = async (req, res, next) => {
    // Grab the jwt from the headers
    const {authorization} = req.headers;
    if(! authorization){
        return res.status(401).json({
            message: `token not found`,
        })
    }

    // Remove the word "bearer" from the authorizaton value
    const getTokenSignature = authorization.split(" ")[1];
    // verify if the jwt ( token ) is valid 
    try{

        // decode and extract the user id from the token 
        const user_id = jwt.verify(getTokenSignature, process.env.SECRET_TOKEN)._id;

        // save the user in request
        req.user_id = await userModel.findById(user_id).select("_id");
        next();

    } catch(err){
        res.status(401).json({
            message: `Error occured: ${err}`,
        })
    }

}

export default auth;
