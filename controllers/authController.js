const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hash } = require("../utils/hashing");
const { signupSchema, signinSchema } = require("../middleware/validator");
const User = require("../models/usersModel");

// Sign Up Function
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({
      email: email,
      password: password,
    });

    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hash(password);

    const newUser = await new User({ email, password: hashedPassword });

    const result = await newUser.save();

    result.password = undefined;
    res.status(201).json({
      success: true,
      message: "Your account has been created successfully.",
      result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Sign In function
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = signinSchema.validate({
      email: email,
    });

    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }

    const token = await jwt.sign(
      { userId: user._id, email: user.email, verified: user.verified },
      process.env.SECRET_KEY,
      {
        expiresIn: "12h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
    });

    return res.status(200).json({ success: true, message: "Signed In" });
  } catch (err) {
    console.log(err);
  }
};

exports.signout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "logged out successfully" });
};

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Already verified" });
    }

    const code = Math.floor(Math.random() * 100000).toString();
  } catch (err) {
    console.log(err);
  }
};
