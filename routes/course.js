import express from "express";

import { courseModel } from "../db.js";

const courseRouter = express.Router();

courseRouter.get("/", (req, res) => {});

courseRouter.post("/purchase", (req, res) => {});

courseRouter.delete("/", (req, res) => {});

export default courseRouter;
