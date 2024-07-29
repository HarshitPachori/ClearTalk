import Message from "../models/MessageModel.js";
import { mkdirSync, renameSync } from "fs";
import { decryptMessage } from "../utils/crypto.js";

export const getMessages = async (req, res, next) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      res.status(400).send("Both user ID's are required.");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });
    
    const decryptedMessages = messages.map((msg) => {
      if (msg.messageType === "text") {
        const decryptedMsg = decryptMessage(msg.content);
        return {
          ...msg.toObject(),
          content: decryptedMsg,
        };
      } else {
        const decryptedUrl = decryptMessage(msg.fileUrl);
        return {
          ...msg.toObject(),
          fileUrl: decryptedUrl,
        };
      }
    });
    return res.status(200).json({ messages: decryptedMessages });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }
    const date = Date.now();
    let fileDir = `uploads/files/${date}`;
    let fileName = `${fileDir}/${req.file.originalname}`;
    mkdirSync(fileDir, { recursive: true });
    renameSync(req.file.path, fileName);
    return res.status(200).json({ filePath: fileName });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
