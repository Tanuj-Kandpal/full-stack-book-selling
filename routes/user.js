import express from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_USER_SECRET } from "../config.js";

import { userModel } from "../db.js";

const app = express();
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  const reqBody = z.object({
    email: z.string().min(3).max(10),
    password: z.string(),
    firstname: z.string().max(10),
    lastname: z.string(),
  });

  const { success, error } = z.safeParse(reqBody, req.body);

  if (success) {
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    await userModel.create({
      email: email,
      password: encryptedPassword,
      firstName: firstname,
      lastName: lastname,
    });

    res.status(200).json({
      msg: "User signed up successfuly",
    });
  } else {
    res.status(400).json({
      msg: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.json({
      msg: "Invalid email address",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_USER_SECRET
  );

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    return res.json({
      msg: "Incorrect password",
    });
  }
  res.json({
    token: token,
  });
});

userRouter.get("/purchases", (req, res) => {});

userRouter.post("/content", (req, res) => {});

export default userRouter;
