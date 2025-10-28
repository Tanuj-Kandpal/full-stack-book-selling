import express from "express";

import { userModel } from "../db.js";

const app = express();
const userRouter = express.Router();
app.use(express.json());

userRouter.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.status(200).json({
    msg: "Signed Up successfully",
  });
});

userRouter.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
});

userRouter.get("/purchases", (req, res) => {});

userRouter.post("/content", (req, res) => {});

export default userRouter;
