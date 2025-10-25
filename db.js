const mongoose = require("mongoose");

mongoose.connect("");

const AdminModel = mongoose.Schema({});

const UserModel = mongoose.Schema({
  email: String,
  password: String,
});

const CourseModel = mongoose.Schema({});

const PurchaseModel = mongoose.Schema({});

module.exports = { AdminModel, UserModel, CourseModel, PurchaseModel };
