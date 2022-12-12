"use strict";

var express = require("express");
var serverless = require("serverless-http");
// const { connectDB } = require('./config/db');

// import express from 'express';
// import serverless from 'serverless-http';
// import { connectDB } from './config/db';
// import Course from './app/models/Course';

var app = express();
var router = express.Router();
var port = 3000;

// Connect MongoDB
// connectDB('mongodb+srv://blog_database:123@cluster0.aipk5ey.mongodb.net/bin_database')

router.get("/", function (req, res, next) {
  return res.json({
    name: 'binayu'
  });

  // Course.find({})
  // 	.then((courses) => {
  // 		return res.json(courses);
  // 	})
  // 	.catch(next);
});

// app.use(`/`, router);
app.use("/.netlify/functions/api", router);

// app.listen(port, () => {
// 	console.log(`App listening on port ${port}`);
// });

module.exports = app;
exports.handler = serverless(app);