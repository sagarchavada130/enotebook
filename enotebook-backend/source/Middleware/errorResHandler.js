module.exports = (code, success, res, message, data) => {
  if (data == null) {
    data = "";
  }

  res.status(code);
  res.json({
    success: success,
    message: message,
    data: data,
  });
};

