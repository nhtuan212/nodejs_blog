const mongoose = require('mongoose');

exports.connect = async () => {
    // try {
    // 	await mongoose.connect('mongodb://localhost:27017/blog_database')
    // 	console.log('connect successfully');
    // } catch (error) {
    // 	console.log({ failed: error });
    // 	return
    // }

    await mongoose
        .connect('mongodb://localhost:27017/blog_database')
        .then(() => {
            console.log('connect successfully');
        })
        .catch((error) => {
            console.log({ failed: error });
        });
};
