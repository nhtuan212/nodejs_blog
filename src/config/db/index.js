import mongoose from 'mongoose';

export const connectDB = async (mongoURL) => {
	await mongoose
        .connect(mongoURL)
			.then(() => console.log('MongoDB connect successfully'))
			.catch((error) => console.log({ failed: error, message: "MongoDB not yet start" }));
}