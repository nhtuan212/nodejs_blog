const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		hello: "hi!"
	});
});

// app.use(`/`, router);
app.use(`/.netlify/functions/index`, router);

module.exports = app;
module.exports.handler = serverless(app);
