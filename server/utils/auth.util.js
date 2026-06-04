import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "zwSgZtdYyPurbQdb";
const expiresIn = process.env.JWT_EXPIRES || "1d" ;

const generateToken = async(payload)=>{
    if (!secretKey) {
        throw new Error("Secret Key Not Defined");
    }

    return jwt.sign(payload,secretKey,{expiresIn : expiresIn})
}

const verifyToken = async(token)=>{
    if (!secretKey) {
        throw new Error("Secret Key Not Defined");
    }

    return jwt.verify(token,secretKey)
}

export {generateToken,verifyToken}
 