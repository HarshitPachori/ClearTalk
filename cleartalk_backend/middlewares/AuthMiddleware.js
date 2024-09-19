import jwt from "jsonwebtoken";

export const verifyJwtToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("You are not authenticated.");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).send("Token is not valid");
    }
    req.userId = payload.userId;
    next();
  });
};
