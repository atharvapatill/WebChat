import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

var corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true 
}
app.use(cors(corsOptions));

//public routes
app.use("/api/v1/auth",authRouter);

app.use(authMiddleware);

//protected routes
app.use("/api/v1/user",userRouter)


const server = http.createServer(app);
const io = new Server(server,{cors:corsOptions});

export {io,server};