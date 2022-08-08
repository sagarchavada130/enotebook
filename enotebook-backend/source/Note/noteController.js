const SuccessResHandler = require("../Middleware/successResHandler");
const ErrorResHandler = require("../Middleware/errorResHandler");
const NoteConstant = require("./noteConstant");
const NoteService = require("./noteService");

const getUserNotes = async (req, res) => {
  try {
    let result = await NoteService.fetchUserNotes(req);
    SuccessResHandler(res, result);
  } catch (error) {
    console.log(UserConstant.MESSAGES.internal_server_error, error);
    ErrorResHandler(
      504,
      false,
      res,
      UserConstant.MESSAGES.internal_server_error,
      ""
    );
  }
};

module.exports = { getUserNotes };
