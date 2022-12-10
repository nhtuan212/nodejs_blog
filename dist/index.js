"use strict";

require('dotenv').config();
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var methodOverride = require('method-override');
var _require = require('express-handlebars'),
  create = _require.create;
var _require2 = require('./routes'),
  route = _require2.route;
var _require3 = require('./config/constants'),
  port = _require3.port,
  ext = _require3.ext,
  mongoURL = _require3.mongoURL;
var _require4 = require('./config/db'),
  connectDB = _require4.connectDB;
var _require5 = require('./app/middlewares/SortMiddleware'),
  SortMiddleware = _require5.SortMiddleware;

// Connect MongoDB
connectDB(mongoURL);
var app = express();
var hbs = create({
  extname: ext,
  helpers: {
    sum: function sum(a, b) {
      return a + b;
    },
    sortable: function sortable(field, sort) {
      var sortType = field === sort.column ? sort.type : 'default';
      var icons = {
        "default": '<i class="fa-sharp fa-solid fa-sort"></i>',
        asc: '<i class="fa-sharp fa-solid fa-arrow-down-a-z"></i>',
        desc: '<i class="fa-sharp fa-solid fa-arrow-down-z-a"></i>'
      };
      var types = {
        "default": 'desc',
        asc: 'desc',
        desc: 'asc'
      };
      var icon = icons[sortType];
      var type = types[sortType];
      return "<a href=\"?_sort&column=".concat(field, "&type=").concat(type, "\">").concat(icon, "</a>");
    }
  }
});

// Apply Midlewares
app.use(express["static"](path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);

// Test middlewares
// Authentication
// Permission/ Authorization
// const protected = (req, res, next) => {
// 	if (['vethuong', 'vevip'].includes(req.query.ve)) {
// 		req.face = "Test face"
// 		return next()
// 	}
// 	res.status(403).json({ message: 'access denied from home page' })
// }
// app.use('/courses', protected)

app.get('/middleware', function (req, res, next) {
  if (['vethuong', 'vevip'].includes(req.query.ve)) {
    req.face = "Test face";
    return next();
  }
  res.status(403).json({
    message: 'access denied'
  });
}, function (req, res, next) {
  res.json({
    message: 'success',
    face: req.face
  });
});

// HTTP logger
app.use(morgan('combined'));

// Template Engine
app.engine(ext, hbs.engine);
app.set('view engine', ext);
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes Init
route(app);
app.listen(port, function () {
  console.log("App listening on port ".concat(port));
});