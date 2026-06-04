import { User } from "../models/user.model.js"

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({}).select("-password").sort({name:1});
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({message:"Failed to fetch all users"});
    }
}

const getLoggedInUserDetails = (req,res)=>{
    try {
        const user = req.user;
        // console.log(user);
        return res.status(200).json({user});

    } catch (error) {
        return res.status(500).json({message:"Failed to fetch loggedin user details"});
    }
}

export {getAllUsers,getLoggedInUserDetails};