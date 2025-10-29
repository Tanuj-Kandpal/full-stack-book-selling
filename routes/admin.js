import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import z from "zod";

const JWT_ADMIN_SECRET = "test12@#$";

import { adminModel } from "../db.js";

const AuthMiddleware = (req, res, next) => {
  const email = req.body.email;
  const token = jwt.sign(
    {
      email: email,
    },
    JWT_ADMIN_SECRET
  );
  next();
};

const UserMiddleware = (req, res, next) => {
  jwt.verify(token, JWT_SECRET);
  next();
};

const adminRouter = express.Router();

const saltRound = 2;

adminRouter.post("/signup", async (req, res) => {
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
    await adminModel.create({
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

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await adminModel.findOne({
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
    JWT_ADMIN_SECRET
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

adminRouter.post("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

adminRouter.put("/course/bulk", (req, res) => {});

export default adminRouter;
