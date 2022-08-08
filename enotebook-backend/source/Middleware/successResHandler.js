module.exports = (res,data) => {
  if (data.data == null) {
    data.data = "";
  }

  res.status(data.code);
  res.json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
