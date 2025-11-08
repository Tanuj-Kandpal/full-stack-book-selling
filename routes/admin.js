import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";
import { adminModel, courseModel } from "../db.js";

import { JWT_ADMIN_SECRET } from "../config.js";
import { adminMiddleware } from "../middleware/admin.js";

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  console.log("req----->", req);
  const { description, title, price, imageUrl } = req.body;

  const adminId = req.adminId;

  const courseDb = await courseModel.create({
    description,
    title,
    price,
    imageUrl,
    creatorid: adminId,
  });

  res.status(200).json({
    message: "course created",
    courseId: courseDb._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { description, title, price, imageUrl, courseId } = req.body;
  const adminCourse = await courseModel.updateOne(
    {
      _id: courseId,
      creatorid: adminId,
    },
    {
      description: description,
      title: title,
      price: price,
      imageUrl: imageUrl,
    }
  );
  res.status(200).json({
    msg: "Your course has been updated",
    courseId: courseId,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const creatorId = req.adminId;

  const adminCourse = await courseModel.find({
    creatorid: creatorId,
  });

  console.log(adminCourse);
  res.status(200).json({
    adminCourse,
  });
});

export default adminRouter;
