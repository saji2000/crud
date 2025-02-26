const express = require("express");
const authController = require("../controllers/authController");
// Router for the APIs
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);
// router.post("/verification", authController.sendVerificationCode);

module.exports = router;
