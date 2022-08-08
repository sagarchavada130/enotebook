const express = require("express");
const userController = require("./userController");
const userValidator = require("./userValidator");
const authenticateUser = require("../Middleware/jwtAuth");

const router = express.Router();

router.post(
  "/createUser",
  userValidator.createUserValidator,
  userController.createUser
);

router.post(
  "/userLogin",
  userValidator.userLoginValidator,
  userController.userLogin
);

router.get(
  "/getUserDetails",
  authenticateUser.verifyToken,
  userController.getUserDetails
);

module.exports = router;
