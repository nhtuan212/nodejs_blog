module.exports = {
	port: process.env.PORT || 3000,
	ext: process.env.EXT || '.html',
	mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/blog_database',
}