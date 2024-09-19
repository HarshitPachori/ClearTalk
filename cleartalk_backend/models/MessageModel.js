import mongoose from "mongoose";
import { decryptMessage, encryptMessage } from "../utils/crypto_util.js";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
    set: (msg) => encryptMessage(msg),
  },
  fileUrl: {
    type: String,
    required: function () {
      return this.messageType === "file";
    },
    set: (url) => encryptMessage(url),
  },
  originalFileName: {
    type: String,
    required: false,
  },
  fileFormat: {
    type: String,
    required: false,
  },
  cloudinaryPublicId: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Messages", messageSchema);
export default Message;
