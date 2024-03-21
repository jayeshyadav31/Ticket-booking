import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    phoneNumber:{
        type:Number,
    }
},
{
    timestamps: true
})
const User=mongoose.model("User",userSchema);
export default User;