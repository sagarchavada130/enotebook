const Joi = require("joi");
const ErrorResHandler = require("../Middleware/errorResHandler");

const createNoteValidator = async (req, res, next) => {
  try {
    let schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      description: Joi.string().min(3).max(150).required(),
      tag: Joi.string().min(3).max(30).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    let message = error.details.map((i) => i.message).join(",");
    let errorMessage = message
      ? message
      : "There is some issue with create note validation.";
    ErrorResHandler(400, false, res, errorMessage, {});
  }
};

const updateNoteValidator = async (req, res, next) => {
  try {
    let bodySchema = Joi.object({
      title: Joi.string().min(3).max(30),
      description: Joi.string().min(3).max(150),
      tag: Joi.string().min(3).max(30),
    });

    let paramsSchema = Joi.object({
      noteId: Joi.string().length(24).required(),
    });

    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    let message = error.details.map((i) => i.message).join(",");
    let errorMessage = message
      ? message
      : "There is some issue with update note validation.";
    ErrorResHandler(400, false, res, errorMessage, {});
  }
};

const deleteNoteValidator = async (req, res, next) => {
  try {
    let schema = Joi.object({
      noteId: Joi.string().length(24).required(),
    });

    await schema.validateAsync(req.params);

    next();
  } catch (error) {
    let message = error.details.map((i) => i.message).join(",");
    let errorMessage = message
      ? message
      : "There is some issue with update note validation.";
    ErrorResHandler(400, false, res, errorMessage, {});
  }
};

module.exports = {
  createNoteValidator,
  updateNoteValidator,
  deleteNoteValidator,
};
