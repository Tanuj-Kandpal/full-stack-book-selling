import express from "express";
import jwt from "jsonwebtoken";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";

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
  next();
};

app.use(express.json());

app.listen(3000);
