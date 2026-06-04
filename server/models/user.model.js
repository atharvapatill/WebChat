import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        validate:/^[a-z0-9_]+$/
    },

    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

export const User = mongoose.model("User",userSchema);