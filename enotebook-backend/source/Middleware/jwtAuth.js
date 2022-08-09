const JWT = require("jsonwebtoken");
const ErrorResHandler = require("./errorResHandler");
const UserConstant = require("../User/userConstant");

let JWT_SECRET = process.env.JWT_SECRET;
let EXP = process.env.JWT_EXP;

const generateToken = async (data) => {
  return JWT.sign({ data: data }, JWT_SECRET, {
    expiresIn: EXP,
  });
};

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["auth-token"];

    if (token) {
      let result = await JWT.verify(token, JWT_SECRET);
      req.user = result.data;
      next();
    } else {
      ErrorResHandler(
        401,
        false,
        res,
        UserConstant.MESSAGES.authentication_using_token,
        ""
      );
    }
  } catch (error) {
    console.log(error);
    ErrorResHandler(
      401,
      false,
      res,
      UserConstant.MESSAGES.authentication_using_token,
      ""
    );
  }
};

module.exports = { generateToken, verifyToken };
