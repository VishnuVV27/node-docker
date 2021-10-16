const express = require("express");
const controller = require("../Controllers/postcontroller");

const router = express.Router();
const protect = require("../authmiddle/authMiddle");
router
  .route("/")
  .get(protect, controller.getAllPosts)
  .post(protect, controller.createPost);

router
  .route("/:id")
  .get(protect, controller.getPost)
  .patch(protect, controller.updatePost)
  .delete(protect, controller.deletePost);

module.exports = router;
