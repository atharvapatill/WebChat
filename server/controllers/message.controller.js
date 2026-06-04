import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

const loadChat = async(req,res)=>{
    try {
        const {senderID,receiverID} = req.body

        const receiver = await User.findById(receiverID);

        if(!receiver){
            return res.status(400).json({message:"user doesn't exist lol"})
        }

        if (receiverID===senderID){
            return res.status(400).json({message:"Cannot have a conversation with yourself"})
        }

        const messages = await Message.find({
            $or:[
                {senderID:senderID,receiverID:receiverID},
                {senderID:receiverID,receiverID:senderID}
            ]}).sort({ createdAt: 1 });

        return res.status(200).json({messages})

    } catch (error) {
        return res.status(500).json({error:"Could not able to load Chat"})
    }
}

const saveMessage = async(req,res)=>{
    try {
        const {senderID, receiverID,  messageContent} = req.body;

        if(!senderID || !receiverID || !messageContent){
            return res.status(400).json({message:"Required fields are missing"})
        }

        const sender = await User.findById(senderID);
        const receiver = await User.findById(receiverID);

        if(!sender || !receiver){
            return res.status(400).json({message:"user doesn't exist"});
        }

        const trimmedMessage = messageContent.trim();

        if(!trimmedMessage){
            return res.status(400).json({message:"empty message"});
        }

        const newMessage = new Message({senderID,receiverID,messageContent});
        await newMessage.save();

        return res.status(200).json({message:"Saved a new Message"});

    } catch (error) {
        return res.status(500).json({message:"Failed to save a message"});
    }
}



export {loadChat,saveMessage};