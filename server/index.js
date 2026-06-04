import dotenv from "dotenv";
import connectDB from "./db/db.config.js"
import { server} from "./app.js";
import "./socket.js";

dotenv.config()

const port = process.env.PORT || 8000;

connectDB()
.then(()=>{
    server.listen(port,()=>{
        console.log(`Server is running on ${port}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection Failed",err);
})
