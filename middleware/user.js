import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config";

export const userMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const decodedToken = jwt.verify(token, JWT_USER_SECRET);
  if (decodedToken) {
    req.userId = decodedToken.id;
    next();
  } else {
    res.json({
      msg: "You are not signed in",
    });
  }
};
