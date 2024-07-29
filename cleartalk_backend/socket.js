import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel.js";
import { decryptMessage } from "./utils/crypto.js";
const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);
    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");
    const decryptedMsg =
      messageData.messageType === "text" && decryptMessage(messageData.content);
    const decryptedUrl =
      messageData.messageType === "file" && decryptMessage(messageData.fileUrl);
    const msgData = {
      ...messageData.toObject(),
      content: decryptedMsg,
    };
    const urlData = {
      ...messageData.toObject(),
      fileUrl: decryptedUrl,
    };
    if (recipientSocketId) {
      io.to(recipientSocketId).emit(
        "recieveMessage",
        messageData.messageType === "text" ? msgData : urlData
      );
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit(
        "recieveMessage",
        messageData.messageType === "text" ? msgData : urlData
      );
    }
  };

  const disconnect = (socket) => {
    console.log(`CLIENT DISCONNECTED : ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(
        `USER CONNECTED userID : ${userId} with socketID : ${socket.id}`
      );
    } else {
      console.log("User id not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
