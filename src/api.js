// const express = require("express");
// const serverless = require("serverless-http");
// const { connectDB } = require('./config/db');

// const app = express();
// const router = express.Router();

import express from 'express';
import serverless from 'serverless-http';
import { connectDB } from './config/db/index.js';

const app = express();
const router = express.Router();


// const Course = require('./app/models/Course');
const port = 3000;

// Connect MongoDB
// connectDB('mongodb+srv://blog_database:123@cluster0.aipk5ey.mongodb.net/bin_database')
connectDB()

router.get("/", (req, res, next) => {
	return res.json({
		name: 'binayu'
	})
	Course.find({})
		.then((courses) => {
			return res.json(courses);
		})
		.catch(next);
});

// app.use(`/`, router);
app.use(`/.netlify/functions/api`, router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

// module.exports = app;
// module.exports.handler = serverless(app);