const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { create } = require('express-handlebars')
const app = express()
const port = 3000
const ext = '.html'
const hbs = create({
	extname: ext
})

app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
app.use(morgan('combined'))

// Template Engine
app.engine(ext, hbs.engine)
app.set('view engine', ext)
app.set('views', path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => {
	res.render('home')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})