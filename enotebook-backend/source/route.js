const noteRoutes = require("./Note/noteRoute");
const userRoutes = require("./User/userRoute");

module.exports = function (app) {
  app.use("/api/v1/enotebook/user", userRoutes);
  app.use("/api/v1/enotebook/note", noteRoutes);
};
