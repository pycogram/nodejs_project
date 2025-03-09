import mongoose from 'mongoose';
import postModel from '../models/postModels.js';
import userModel from '../models/userModels.js';

/* ============== get all post================ */

const getAllPost = async (req, res) => {

    // console.log("Registered Models:", mongoose.modelNames());

    try{
        const data = await postModel.find()
                                    .sort({createdAt: "desc"})
                                    .populate('user_id', 'email')  
                                    .exec();       

        if (data.length === 0) {
            return res.status(404).json({
                status: 'not found',
                message: "No data found",
            });
        }

        res.status(200).json({
            status: "success",
            numberOfPost: data.length > 1 ? `${data.length} posts` : `${data.length} post`,
            data
        });
    } catch(err){
        res.status(500).json({
            status: `server error`,
            error: `Error occured: ${err.message}`
        })
    }
}

/* ============== get a post by user================ */
const getPostByUser = async (req, res) => {
    const user = await userModel.findById(req.user_id).select("_id");

    try{
        const data = await postModel.find({user_id: user}).sort({createdAt: "descending"});

        // Check if data is an empty array
        
        if (data.length === 0) {
            return res.status(404).json({
                status: 'not found',
                message: "No data found",
            });
        }
        res.status(200).json({
            status: "success",
            numberOfPost: data.length > 1 ? `${data.length} posts` : `${data.length} post`,
            data
        })
    } catch(err){
        res.status(403).json({
            status: `not found`,
            message: `Error - ${err.message || err}`
        })
    }
}

/* ============== create a post ================ */
const createPost = async (req, res) => {
    const {title, body} = req.body;

    // check if the fields are not empty
    if(!title || !body){
        return res.status(400).json({
            message: "Every field is required"
        })
    }

    if(! req.user_id){
        return res.status(400).json({
            message: "user does not exist anymore"
        })
    }

    try{
        const data = await postModel.create({user_id: req.user_id, title, body})
        res.status(200).json({
            status: `success`,
            data
        })
    } catch(err){
        res.status(500).json({
            status: `server error`,
            error: `Error occured: ${err}`
        })
    }
}

/* ============== delete a post ================ */
const deletePost = async (req, res) => {
    // check if ID is invalid

    const {id} = req.params;

    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: `ID - ${id} is invalid`
        });
    }

    // check if post exist
    const getPost = await postModel.findById(req.params.id);

    if(! getPost){
        res.status(200).json({
            message: `post not found`,
        });
    }
    //const getPostName = getPost.title;
    try{   
        // check if he is the owner of the post
        const ownerPost = await userModel.findById(req.user_id);
        const deletePost = getPost.user_id.equals(ownerPost._id);
        if(! deletePost){
            return res.status.json({
                message: `unauthorized to delete post`
            })
        }
        await getPost.deleteOne();
        res.status(200).json({
            //message: `post with title '${getPostName}' has been deleted`,
            message: `success`
        });
    } catch(err){
        res.status(500).json({
            status: `server error`,
            error: `Error occured: ${err}`
        });
    }
}

/* ============== update a post ================ */
const updatePost = async (req, res) => {
    // get request info
    const {title, body} = req.body;

    // check if update posts are the same with same on the db
    const matchPost = await postModel.findOne({title, body});
    if(matchPost){
        return res.status(400).json({
            message: "No change made yet"
        })
    }

    // check if the fields are not empty
    if(!title || !body){
        return res.status(400).json({
            message: "Every field is required"
        })
    }

    // check if ID is invalid
    const {id} = req.params;
    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: `ID - ${id} is invalid`
        });
    }

    // check if post exist
    const getPost = await postModel.findById(id);
    if(! getPost){
        return res.status(200).json({
            message: `post not found`,
        });
    }

    try{   
        // check if he is the owner of the post
        const ownerPost = await userModel.findById(req.user_id);
        const updatePost = getPost.user_id.equals(ownerPost._id);
        if(! updatePost){
            return res.status(200).json({
                message: `unathorized to update post`,
            });
        } 
        await getPost.updateOne({title, body});
        res.status(200).json({
            message: `post updated`,
        });
    } catch(err){
        res.status(500).json({
            status: `server error`,
            error: `Error occured: ${err}`
        });
    }
}


export {getAllPost, getPostByUser, createPost, deletePost, updatePost}