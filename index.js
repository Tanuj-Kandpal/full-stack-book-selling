import express from "express";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());

//Express Routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

const main = async () => {
  await mongoose.connect(process.env.MONGOOSE_URL);
  app.listen(3000);
  console.log("DB connected successfully");
};

main();
