import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser,logoutUser } from "../controllers/auth.controller.js"


const authRouter = express.Router()

authRouter.post("/registration",registerUser);
authRouter.post("/login",loginUser);
authRouter.delete("/logout",authMiddleware,logoutUser);


export {authRouter}