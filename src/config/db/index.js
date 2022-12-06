const mongoose = require('mongoose');

exports.connect = async () => {
	await mongoose
        .connect('mongodb://localhost:27017/blog_database')
			.then(() => console.log('MongoDB connect successfully'))
			.catch((error) => console.log({ failed: error, message: "MongoDB not yet start" }));
};
