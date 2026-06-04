import express from "express"
import { loadChat, saveMessage } from "../controllers/message.controller.js"
import { getAllUsers,getLoggedInUserDetails } from "../controllers/user.controller.js";

const userRouter = express.Router()


userRouter.post("/save",saveMessage);
userRouter.post("/loadChat",loadChat); 
userRouter.get("/getAllUsers",getAllUsers);
userRouter.get("/me",getLoggedInUserDetails);
// always keep dymanic routes at bottom.

export {userRouter}


