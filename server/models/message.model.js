import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    messageContent:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Message = mongoose.model("message",messageSchema);