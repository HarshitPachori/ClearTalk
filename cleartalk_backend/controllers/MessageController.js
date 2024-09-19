import Message from "../models/MessageModel.js";
import { decryptMessage, encryptMessage } from "../utils/crypto_util.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary_util.js";

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
    // const date = Date.now();
    // let fileDir = `uploads/files/${date}`;
    // let fileName = `${fileDir}/${req.file.originalname}`;
    // mkdirSync(fileDir, { recursive: true });
    // renameSync(req.file.path, fileName);

    // Set resource type based on file type
    let resType;
    const mimeType = req.file.mimetype;

    if (mimeType.startsWith("image/")) {
      resType = "image";
    } else if (mimeType.startsWith("video/")) {
      resType = "video";
    } else {
      resType = "raw"; // PDFs, docs, zips, etc.
    }

    const uploadedFile = await uploadOnCloudinary(req.file, resType);
    return res.status(200).json({
      filePath: uploadedFile.secure_url,
      publicId: uploadedFile.public_id,
      originalFileName: req.file.originalname,
      fileFormat: resType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteFilesUploadedOneWeekAgo = async (req, res, next) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oldFiles = await Message.find({
      timestamp: { $lt: oneWeekAgo },
      fileUrl: { $ne: null },
    });

    for (const file of oldFiles) {
      if (file.cloudinaryPublicId) {
        await deleteFromCloudinary(file.cloudinaryPublicId, file.fileFormat);
      }
      file.fileUrl = null;
      file.cloudinaryPublicId = null;
      file.originalFileName = "No more available";
      await file.save();
    }
    res.status(200).json({ message: "Old files cleaned up!" });
  } catch (error) {
    res.status(500).json({ message: `Error cleaning up files : ${error}` });
  }
};
