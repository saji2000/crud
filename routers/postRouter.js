const express = require("express");
const postController = require("../controllers/postController");
// Router for the APIs
const router = express.Router();

router.get("/all-posts", postController.getAll);
// router.get("/one-post", postController.getOne);
// router.post("/create-post", postController.create);
// router.put("/update-post", postController.update);
// router.delete("/delete-post", postController.delete);
// router.post("/verification", authController.sendVerificationCode);

module.exports = router;
