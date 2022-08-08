const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("./userModel");
const UserConstant = require("./userConstant");
const TokenGenerator = require("../Middleware/jwtAuth");

const addUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let responceData = {};

      let isUserExist = await User.findOne({ email: data.email });

      if (isUserExist) {
        responceData = {
          code: 401,
          success: false,
          message: UserConstant.MESSAGES.user_already_exist,
          data: "",
        };
        resolve(responceData);
      } else {
        let salt = await bcrypt.genSalt(10);

        let password = await bcrypt.hash(data.password, salt);

        let saveObj = {
          name: data.name,
          email: data.email,
          password: password,
        };

        let newUser = new User(saveObj);

        let addUser = await newUser.save();

        let tokenData = {
          _id: addUser._id,
          email: addUser.email,
          name: addUser.name,
        };

        const token = await TokenGenerator.generateToken(tokenData);

        responceData = {
          code: 200,
          success: true,
          message: UserConstant.MESSAGES.create_user,
          data: token,
        };

        resolve(responceData);
      }
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: UserConstant.MESSAGES.create_user_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

const loginUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    let responceData = {};
    try {
      let { email, password } = data;

      let userData = await User.findOne(
        { email: email },
        { email: 1, name: 1, _id: 1, password: 1 }
      );

      if (userData) {
        let comparePassword = await bcrypt.compare(password, userData.password);
        if (comparePassword) {
          let data = {
            _id: userData._id,
            email: userData.email,
            name: userData.name,
          };
          let authToken = await TokenGenerator.generateToken(data);
          responceData = {
            code: 200,
            success: true,
            message: UserConstant.MESSAGES.login_successful,
            data: authToken,
          };
          resolve(responceData);
        } else {
          responceData = {
            code: 401,
            success: false,
            message: UserConstant.MESSAGES.enter_valid_credentials,
            data: "",
          };

          resolve(responceData);
        }
      } else {
        responceData = {
          code: 401,
          success: false,
          message: UserConstant.MESSAGES.enter_valid_credentials,
          data: "",
        };

        resolve(responceData);
      }
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: UserConstant.MESSAGES.login_user_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

const userDetails = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userId = data.user._id;
      let userDetails = await User.findOne({
        _id: mongoose.Types.ObjectId(userId),
      });
      if (userDetails) {
        responceData = {
          code: 200,
          success: true,
          message: UserConstant.MESSAGES.get_user_successful,
          data: userDetails,
        };
        resolve(responceData);
      } else {
        responceData = {
          code: 404,
          success: false,
          message: UserConstant.MESSAGES.user_not_found,
          data: "",
        };
        resolve(responceData);
      }
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: UserConstant.MESSAGES.login_user_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

module.exports = { addUser, loginUser, userDetails };
