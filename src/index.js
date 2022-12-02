const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const { route } = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

const app = express();
const port = 3000;
const ext = '.html';
const hbs = create({
    extname: ext,
});

// Apply Midlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template Engine
app.engine(ext, hbs.engine);
app.set('view engine', ext);
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes Init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
