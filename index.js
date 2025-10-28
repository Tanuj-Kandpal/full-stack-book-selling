import express from "express";
import jwt from "jsonwebtoken";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import mongoose from "mongoose";

const app = express();

const JWT_SECRET = "test12@#$";

//Express Routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

const AuthMiddleware = (req, res, next) => {
  const email = req.body.email;
  const token = jwt.sign(
    {
      email: email,
    },
    JWT_SECRET
  );
  next();
};

const UserMiddleware = (req, res, next) => {
  jwt.verify(token, JWT_SECRET);
  next();
};

app.use(express.json());

const main = async () => {
  await mongoose.connect(""
  );
  app.listen(3000);
  console.log("DB connected successfully");
};

main();
