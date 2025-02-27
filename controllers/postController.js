const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema } = require("../middleware/validator");
const Posts = require("../models/postsModel");

// Sign Up Function
exports.getAll = async (req, res) => {
  const { page } = req.query;
  const postsPerPage = 10;
  try {
    let pageNum = 0;
    if (page <= 1) {
      pageNum = 0;
    } else {
      pageNum = page - 1;
    }

    const result = await Posts.find()
      .sort({ createdAt: -1 })
      .skip(pageNum * postsPerPage)
      .limit(postsPerPage)
      .populate({ path: "userId", select: "email" });

    res.status(200).json({ success: true, message: "posts", data: result });
  } catch (err) {
    console.log(err);
  }
};
