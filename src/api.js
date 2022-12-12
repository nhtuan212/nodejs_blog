const express = require("express");
const serverless = require("serverless-http");
const { port, ext, mongoURL } = require('./config/constants');

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		hello: "hi!"
	});
});

// app.use(`/`, router);
app.use(`/.netlify/functions/api`, router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);