import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name field is required'],
        trim: true,
    },
    email: {
        type: String,
        require: [true, 'Email field is required'],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password field is required'],
        select: false,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        select: false
    },
    verificationCodeValidation: {
        type: Number,
        select: false
    },
    forgetPasswordCode: {
        type: String,
        select: false
    },
    forgetPasswordCodeValidation: {
        type: Number,
        select: false
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);
export default userModel;