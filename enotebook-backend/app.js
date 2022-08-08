const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbConnection = require("./database");
const route = require("./source/route.js");

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);
dbConnection();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken,Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
  next();
});

app.listen(port, () => {
  console.log(`-------------- eNotebook app listening on port ${port} --------------`);
});
