"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const express = require("express");
// const serverless = require("serverless-http");
// const { connectDB } = require('./config/db');

// const app = express();
// const router = express.Router();

// import serverless from 'serverless-http';
// import { connectDB } from './config/db';
// import Course from './app/models/Course';

var app = (0, _express["default"])();
var router = _express["default"].Router();
var port = 3000;

// Connect MongoDB
// connectDB('mongodb+srv://blog_database:123@cluster0.aipk5ey.mongodb.net/bin_database')

router.get("/", function (req, res, next) {
  return res.json({
    name: 'binayu'
  });
  Course.find({}).then(function (courses) {
    return res.json(courses);
  })["catch"](next);
});

// app.use(`/`, router);
app.use("/.netlify/functions/api", router);
app.listen(port, function () {
  console.log("App listening on port ".concat(port));
});

// module.exports = app;
// module.exports.handler = serverless(app);