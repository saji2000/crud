const mongoose = require("mongoose");

// User Model
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: [true, "Email must be unique!"],
      minLength: [5, "Email must have at least 5 characters!"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    forgotPasswordCode: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
