require('dotenv').config();
const express = require("express");
const serverless = require("serverless-http");
const { port, ext, mongoURL } = require('./config/constants');
const { connectDB } = require('./config/db');

const app = express();
const router = express.Router();

const Course = require('./app/models/Course');

// Connect MongoDB
connectDB(mongoURL)

router.get("/", (req, res, next) => {
	Course.find({})
		.then((courses) => {
			console.log({
				courses
			});
			return res.json(courses);
		})
		.catch(next);
});

// app.use(`/`, router);
app.use(`/.netlify/functions/api`, router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);