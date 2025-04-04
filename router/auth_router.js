const express = require("express");
const router = express.Router();
const authController = require("S:\\Web Dev\\BansiTech\\controllers\\auth_controller.js");  
const signupSchema = require("../validators/auth_validators");
const validate = require("S:\\Web Dev\\BansiTech\\middlewares\\validate-middleware.js");

router.route("/").get(authController.home);
router.route("/register")
.post(validate(signupSchema),authController.register); 
router.route("/login").post(authController.login); 

module.exports = router;
