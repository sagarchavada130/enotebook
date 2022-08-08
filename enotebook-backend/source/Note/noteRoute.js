const express = require("express");
const noteController = require("./noteController");
const authenticateUser = require("../Middleware/jwtAuth");

const router = express.Router();

router.get(
  "/fetchUserNotes",
  authenticateUser.verifyToken,
  noteController.getUserNotes
);

module.exports = router;
