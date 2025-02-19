const { hash } = require("../utils/hashing");
const { signupSchema, signinSchema } = require("../middleware/validator");
const User = require("../models/usersModel");

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

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error, value } = signinSchema.validate({
      email: email,
    });

    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const user = User.findOne({ email: email }).select("+password");

    console.log(user);

    // bcrypt.compare(password, hash, function (err, result) {});
  } catch (err) {
    console.log(err);
  }
};
