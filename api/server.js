import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import "./DataBase/conection.js";
import cors from "cors";
import { Server } from "socket.io";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRpute from "./Routes/messageRpute.js";



app.use(express.json({ limit: "50mb", extented: true }));
app.use(express.urlencoded({limit : "50mb" , extended: true}))
app.use(cors());

app.use("/auth", userRoutes);
app.use("/chats", chatRoutes);
app.use("/message", messageRpute);

const server = app.listen(port, () => {
  console.log(`App is Running on  ${port} Port Sucessfully`);
});


const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chatmee.netlify.app/",
  },
});


io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
  });

  socket.on("Join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new Message", (newMessageReceived) => {
    var chat = newMessageReceived.chatId;

    if (!chat.users) return console.log("user Not Defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message Received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected SuccessFully");
    socket.leave(userData._id);
  });

});
