import jwt from "jsonwebtoken";
import { JWT_ADMIN_SECRET } from "../config.js";

export const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const decodedToken = jwt.verify(token, JWT_ADMIN_SECRET);
  if (decodedToken) {
    req.userId = decodedToken.id;
    next();
  } else {
    res.json({
      msg: "You are not signed in",
    });
  }
};
