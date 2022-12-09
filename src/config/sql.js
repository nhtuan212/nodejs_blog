const initOptions = {
	error(err, e) {
		if (err) {
			console.log('Connect PostgresSQL failed');
		}
	}
};

const pgp = require('pg-promise')(initOptions)
exports.SQLConnect = pgp({
	user: 'postgres',
	host: 'localhost',
	database: 'database_1',
	password: 'Binayu95',
	port: 2102,
})


// const { SQLConnect } = require('./config/sql');
// SQLConnect.query('SELECT * FROM PRODUCTS')
// 	.then((res) => {
// 		console.log({
// 			res
// 		})
// 	})
// 	.catch((error) => {
// 		console.log('ERROR:', error)
// 	})