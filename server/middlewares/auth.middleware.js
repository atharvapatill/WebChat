import { verifyToken } from "../utils/auth.util.js";

const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.cookies.token

        console.log("token", token)

        if (!token) {
            return res.status(401).json({message:"No token, authorization denied"})
        }

        const decodeToken = await verifyToken(token);
        req.user = decodeToken

        next()
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"})
    }
}

export {authMiddleware}