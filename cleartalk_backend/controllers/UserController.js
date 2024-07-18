import { renameSync, unlinkSync } from "fs";
import User from "../models/UserModel.js";

export const getUserInfo = async (req, res, next) => {
  try {
    console.log(req.userId);
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with given id not found.");
    }

    return res.status(200).json({
      user: {
        id: userData._id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName || color < 0) {
      return res
        .status(400)
        .send("FirstName and LastName and Color are required");
    }
    const userData = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );
    if (!userData) {
      return res.status(404).send("User with given id not found.");
    }

    return res.status(200).json({
      user: {
        id: userData._id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateUserProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const userData = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );
    if (!userData) {
      return res.status(404).send("User with given id not found.");
    }

    return res.status(200).json({
      image: userData.image,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const removeUserProfileImage = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with given id not found.");
    }
if (userData.image) {
  unlinkSync(userData.image);
}
userData.image=null
await userData.save()
    return res.status(200).send("Profile Image removed successfully.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
