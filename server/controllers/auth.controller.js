import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/auth.util.js";

const registerUser = async(req,res)=>{
    try {
        const {username, name, password} = req.body;
        
        if(!username || !name || !password){
            return res.status(400).json({message:"Required fields are missing"})
        }

        const existingUser = await User.findOne({username:username});

        if(existingUser){
            return res.status(400).json({message:"Username already Taken"});
        }

        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltrounds);

        const newUser = new User({username:username,name:name,password:hashedPassword});
        await newUser.save();

        return res.status(201).json({message:"User Registered"});

    } catch (error) {

        return res.status(500).json({message:"Failed to Register user"});

    }
}

const loginUser = async(req,res)=>{
    try {
        const {username,password} = req.body;

        // console.log(req.body)

        if(!username || !password){
            return res.status(400).json({message:"Required fields are missing"})
        }

        const existingUser = await User.findOne({username:username});

        if(!existingUser){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token = await generateToken({_id:existingUser._id,name:existingUser.name, username:existingUser.username});
        console.log(token);

        res.cookie("token",token,{
            httpOnly:true,
            secure: false,
            // secure:process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({message:"Login Successful"})

    } catch (error) {
        return res.status(500).json({ message : "Login failed" })
    }
}

const logoutUser = (req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure: false,
            // secure:process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        return res.status(200).json({message:"User Logged Out"})
    } catch (error) {
        return res.status(500).json({error:"Failed to logged out"})
    }
}

export {registerUser,loginUser,logoutUser};