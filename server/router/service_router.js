const express = require("express");
const services = require("../controllers/service_controller");
const router = express.Router();


// here firstly define the route and then after this define function like (services) from where it extract data
router.route("/service").get(services);

module.exports = router;