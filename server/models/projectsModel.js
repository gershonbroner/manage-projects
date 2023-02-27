const mongoose = require("mongoose");
const { UserModel } = require("./userModel");
const { Schema } = require("mongoose");
const projectSchema = new mongoose.Schema({
  nameOfproject: { type: String, required: true },
  description: { type: String, required: true },
  participants: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    },
  ],
  missions: [
    {
      description: { type: String, required: true },
      participants: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
          },
        },
      ],
      status: { type: String },
    },
  ],
});

exports.projectModel = mongoose.model("projects", projectSchema);
