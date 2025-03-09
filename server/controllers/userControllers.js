import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

/* 
    import dotenv from "dotenv";
    dotevn.config({path: './config.env'});
    dotevn.config({path: '.env'});
*/

// create a jwt token
const tokenUser = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_TOKEN, {expiresIn: "10d"})
}

// register user
const createUser = async(req, res) => {
    //get a req from the user
    const {email, password, confirm_password} = req.body;

    // check if the fields are not empty
    if(! email || ! password){
        return res.status(400).json({
            message: "Every field is required"
        });
    }

    // check if password and confirm password are the same
    if(password !== confirm_password){
        return res.status(400).json({
            message: "confirm password does not match --"
        });
    }

    // check if email exist
    const existingEmail = await userModel.findOne({email})
    if(existingEmail){
        return res.status(400).json({
            message: "email already exist"
        });
    }

    // salt or hash password
    const saltNum = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("" + password, saltNum);

    // const getTokenSignature = tokenUser({userFound._id, userFound.email});

    try{
        const userRegister = await userModel.create({email, password: hashedPassword});

        // sign in user with jwtoken 
        const getTokenSignature = tokenUser(userRegister._id, userRegister._email);

        res.status(200).json({
            status: `success`,
            message: `Account created successfully, Pls login`,
            email,
            getTokenSignature
        });
    } catch(err){
        res.status(500).json({
            status: `server error`,
            error: `Error occured: ${err}`
        });
    }
}

// login user
const loginUser = async(req, res) => {
    //get a req from the user
    const {email, password} = req.body;

    // check if the fields are not empty
    if(! email || ! password){
        return res.status(400).json({
            message: "Every field is required"
        });
    }

    // check if email exist
    const userFound = await userModel.findOne({email});
    if(! userFound ){
        return res.status(400).json({
            status: "fail",
            message: "email not registered"
        });
    }
    
    // confirm password
    const matchPassword = await bcrypt.compare(password, userFound.password);
    if(! matchPassword){
        return res.status(400).json({
            message: `email or password incorrect`
        });
    } 

    // sign in user with jwtoken 
    // const getTokenSignature = tokenUser({userFound._id, userFound.email});
    const getTokenSignature = tokenUser(userFound._id);

    // send response
    try{
        res.status(200).json({
            status: `success`,
            message: `user with the email '${email}' login successfully`,
            email,
            getTokenSignature 
        });
    } catch(err){
        res.status(500).json({
            status: `server error`,
            message: `Error occured: ${err}`
        });
    }


}

export {createUser, loginUser};