import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const cookieValidity = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
const jwtTokenValidity = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: jwtTokenValidity,
    algorithm: "HS256",
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).send("user already exists with this email");
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      expires: cookieValidity,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found with this email.");
    }
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("email or password is incorrect.");
    }

    res.cookie("jwt", createToken(email, user._id), {
      expires: cookieValidity,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie(
      "jwt",
      {},
      {
        expires: new Date(Date.now() + 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      }
    );
    return res.status(200).send("Log out successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
