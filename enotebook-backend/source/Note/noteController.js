const SuccessResHandler = require("../Middleware/successResHandler");
const ErrorResHandler = require("../Middleware/errorResHandler");
const NoteConstant = require("./noteConstant");
const NoteService = require("./noteService");

const createNote = async (req, res) => {
  try {
    let result = await NoteService.createNote(req);
    SuccessResHandler(res, result);
  } catch (error) {
    console.log(NoteConstant.MESSAGES.internal_server_error, error);
    ErrorResHandler(
      504,
      false,
      res,
      NoteConstant.MESSAGES.internal_server_error,
      ""
    );
  }
};

const getUserNotes = async (req, res) => {
  try {
    let result = await NoteService.fetchUserNotes(req);
    SuccessResHandler(res, result);
  } catch (error) {
    console.log(NoteConstant.MESSAGES.internal_server_error, error);
    ErrorResHandler(
      504,
      false,
      res,
      NoteConstant.MESSAGES.internal_server_error,
      ""
    );
  }
};

const updateUserNote = async (req, res) => {
  try {
    let result = await NoteService.updateNotes(req);
    SuccessResHandler(res, result);
  } catch (error) {
    console.log(NoteConstant.MESSAGES.internal_server_error, error);
    ErrorResHandler(
      504,
      false,
      res,
      NoteConstant.MESSAGES.internal_server_error,
      ""
    );
  }
};

const deleteUserNote = async (req, res) => {
  try {
    let result = await NoteService.deleteNotes(req);
    SuccessResHandler(res, result);
  } catch (error) {
    console.log(NoteConstant.MESSAGES.internal_server_error, error);
    ErrorResHandler(
      504,
      false,
      res,
      NoteConstant.MESSAGES.internal_server_error,
      ""
    );
  }
};

module.exports = { getUserNotes, createNote, updateUserNote, deleteUserNote };
