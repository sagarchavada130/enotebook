const Note = require("./noteModel");
const NoteConstant = require("./noteConstant");
const TokenGenerator = require("../Middleware/jwtAuth");
const bcrypt = require("bcryptjs");

const fetchUserNotes = async (data) => {
  return new Promise(async (resolve, reject) => {
    let responceData = {};
    try {
      let userId = data.user._id;
    } catch (error) {}
  });
};

module.exports = {};
