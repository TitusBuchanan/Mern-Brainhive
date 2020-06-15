const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength:3,
      maxlength:30
    },
    password: {
      type: String,
      required: true,
      minlength:6
    },
    lastLogin: Date,
  },
  { timestamps: {} }
);

module.exports = User = mongoose.model("users", userSchema);