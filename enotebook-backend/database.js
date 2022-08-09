const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const mongoURL = process.env.MONGO_URL;

const connection = () => {
  mongoose.connect(mongoURL, () => {
    console.log("-------------- Database connection successfully --------------");
  });
};

module.exports = connection;
