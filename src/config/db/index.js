const mongoose = require('mongoose')


// exports.connectDB = async (mongoURL) => {
// 	await mongoose
//         .connect(mongoURL)
// 			.then(() => console.log('MongoDB connect successfully'))
// 			.catch((error) => console.log({ failed: error, message: "MongoDB not yet start" }));
// }

const connectDB = async () => await mongoose.connect('mongodb+srv://blog_database:123@cluster0.aipk5ey.mongodb.net/bin_database');

module.exports = connectDB