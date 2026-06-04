import { io } from "./app.js";

io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    // console.log("socket message",data);

    // send message to all clients
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

