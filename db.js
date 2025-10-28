import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new mongoose.Schema({
  description: String,
  title: String,
  price: Number,
  imageUrl: String,
  creatorid: ObjectId,
});

const purchaseSchema = new mongoose.Schema({
  courseid: ObjectId,
  userid: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

export { userModel, adminModel, courseModel, purchaseModel };
