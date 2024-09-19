import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

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
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      maxAge: jwtTokenValidity,
      secure: true,
      sameSite: "None",
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
