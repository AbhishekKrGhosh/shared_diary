import mongoose from "mongoose";

const userSchema2 = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720396800&semt=sph"
    }
},{timestamps:true})

const User2 = mongoose.model('User2', userSchema2)
export default User2