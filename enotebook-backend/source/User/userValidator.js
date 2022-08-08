const Joi = require("joi");
const ErrorResHandler = require("../Middleware/errorResHandler");

const createUserValidator = async (req, res, next) => {
  try {
    let schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),

      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    let message = error.details.map((i) => i.message).join(",");
    let errorMessage = message
      ? message
      : "There is some issue with create user validation.";
    ErrorResHandler(400, false, res, errorMessage, {});
  }
};

const userLoginValidator = async (req, res, next) => {
  try {
    let schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    let message = error.details.map((i) => i.message).join(",");
    let errorMessage = message
      ? message
      : "There is some issue with login user validation.";
    ErrorResHandler(400, false, res, errorMessage, {});
  }
};

module.exports = { createUserValidator, userLoginValidator };
