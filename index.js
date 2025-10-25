const express = require("express");

const jwt = require("jsonwebtoken");

import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import courseRouter from "./routes/course";

const app = express();

const JWT_SECRET = "test12@#$";

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

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
