import express from "express";

const adminRouter = express.Router();

adminRouter.post("/login", (req, res) => {});

adminRouter.post("/signup", (req, res) => {});

adminRouter.post("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

adminRouter.put("/course/bulk", (req, res) => {});

export default adminRouter;
