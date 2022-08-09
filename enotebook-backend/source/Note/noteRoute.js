const express = require("express");
const noteController = require("./noteController");
const noteValidator = require("./noteValidator");
const authenticateUser = require("../Middleware/jwtAuth");

const router = express.Router();

router.post(
  "/createNote",
  authenticateUser.verifyToken,
  noteValidator.createNoteValidator,
  noteController.createNote
);

router.get(
  "/fetchUserNotes",
  authenticateUser.verifyToken,
  noteController.getUserNotes
);

router.put(
  "/updateUserNote/:noteId",
  noteValidator.updateNoteValidator,
  authenticateUser.verifyToken,
  noteController.updateUserNote
);

router.delete(
  "/deleteUserNote/:noteId",
  noteValidator.deleteNoteValidator,
  authenticateUser.verifyToken,
  noteController.deleteUserNote
);

module.exports = router;
