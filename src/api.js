// const express = require("express");
// const serverless = require("serverless-http");
// const { connectDB } = require('./config/db');

import express from 'express';
import serverless from 'serverless-http';
import { connectDB } from './config/db';
import Course from './app/models/Course';

const app = express();
const router = express.Router();

const port = 3000;

// Connect MongoDB
connectDB('mongodb+srv://blog_database:123@cluster0.aipk5ey.mongodb.net/bin_database')

router.get("/", (req, res, next) => {
	Course.find({})
		.then((courses) => {
			return res.json(courses);
		})
		.catch(next);
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);