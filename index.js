const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json({ extended: false }));

router.get("/", (req, res, next) => {
	res.json({
		name: 'binayu'
	})
});
app.use("/api/product", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));