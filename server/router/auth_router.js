// const express = require("express");
// const router = express.Router();
// const authController = require("S:\\Web Dev\\BansiTech\\server\\controllers\\auth_controller.js");  
// const signupSchema = require("S:\\Web Dev\\BansiTech\\server\\validators\\auth_validators.js");
// const validate = require("S:\\Web Dev\\BansiTech\\server\\middlewares\\validate-middleware.js");

// router.route("/").get(authController.home);
// router.route("/register")
// .post(validate(signupSchema),authController.register); 
// router.route("/login").post(authController.login); 

// module.exports = router;

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_controller");
const signupSchema = require("../validators/auth_validators");
const validate = require("../middlewares/validate-middleware");

// Routes
router.route("/").get(authController.home);

router
  .route("/register")
  .post(validate(signupSchema), authController.register);

router.route("/login").post(authController.login);

module.exports = router;

