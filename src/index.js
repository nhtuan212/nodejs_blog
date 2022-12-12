const express = require("express");
const serverless = require("serverless-http");
const { connectDB } = require('./config/db');
const Course = require('./app/models/Course');

// import express from 'express';
// import serverless from 'serverless-http';
// import { connectDB } from './config/db';
// import Course from './app/models/Course';

const app = express();
const router = express.Router();

// Connect MongoDB
connectDB('mongodb+srv://blog_database:123@cluster0.aipk5ey.mongodb.net/bin_database')

// Vercel
const port = 3000
router.get("/", (req, res, next) => {
	Course.find({})
		.then((courses) => {
			return res.json(courses);
		})
		.catch(next);
});
app.use("/api/product", router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

// Netlify
// router.get("/", (req, res, next) => {
// 	Course.find({})
// 		.then((courses) => {
// 			return res.json(courses);
// 		})
// 		.catch(next);
// });
// app.use(`/.netlify/functions/api`, router);

// module.exports = app;
// const handler = serverless(app);
// module.exports.handler = async (event, context) => {
// 	const result = await handler(event, context);
// 	return result;
// };
// module.exports.handler = serverless(app);