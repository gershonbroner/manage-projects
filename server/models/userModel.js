const mongoose = require("mongoose");
const joi = require("joi");
const { number } = require("joi");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  role: String,
});

exports.UserModel = mongoose.model("users", userSchema);

exports.Validuser = (_bodyData) => {
  let joySchema = joi.object({
    name: joi.string().min(2).max(99).required(),
    email: joi.string().min(2).max(300).required().email(),
    pass: joi.string().min(3).max(100).required(),
    role: joi.string().min(3).max(100).required(),
  });
  return joySchema.validate(_bodyData);
};

exports.Validlogin = (_bodyData) => {
  let joySchema = joi.object({
    email: joi.string().min(2).max(300).required().email(),
    pass: joi.string().min(3).max(100).required(),
  });
  return joySchema.validate(_bodyData);
};
