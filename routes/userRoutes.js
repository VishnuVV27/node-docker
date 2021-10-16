const express = require("express");
const controller = require("../Controllers/authController");
const router = express.Router();

router.route("/signup").post(controller.signUp);
router.route("/login").post(controller.login);

module.exports = router;
