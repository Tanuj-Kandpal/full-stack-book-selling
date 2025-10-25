const mongoose = require("mongoose");

mongoose.connect("");

const AdminModel = mongoose.Schema({
  email:String,

});

const UserModel = mongoose.Schema({
  email: String,
  password: String,
});

const CourseModel = mongoose.Schema({
  description:String,
  

});

const PurchaseModel = mongoose.Schema({});

module.exports = { AdminModel, UserModel, CourseModel, PurchaseModel };
