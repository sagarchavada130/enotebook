const SuccessResHandler = require("../Middleware/successResHandler");
const ErrorResHandler = require("../Middleware/errorResHandler");
const UserConstant = require("./userConstant");
const UserService = require("./userService");

const getUserList = async (req, res) => {
  res.send("Hello");
};

const createUser = async (req, res) => {
  try {
    let data = req.body;
    let result = await UserService.addUser(data);

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

const userLogin = async (req, res) => {
  try {
    let data = req.body;
    let result = await UserService.loginUser(data);

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

const getUserDetails = async (req, res) => {
  try {
    let result = await UserService.userDetails(req);

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

module.exports = { userLogin, createUser, getUserDetails };
