// require('dotenv').config();
// const path = require('path');
// const express = require('express');
// const morgan = require('morgan');
// const methodOverride = require('method-override');
// const { create } = require('express-handlebars');
// const { route } = require('./routes');
// const { port, ext, mongoURL } = require('./config/constants');
// const { connectDB } = require('./config/db');
// const { SortMiddleware } = require('./app/middlewares/SortMiddleware');

import 'dotenv/config'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import { create } from 'express-handlebars'
import { route } from './routes'
import { port, ext, mongoURL } from './config/constants'
import { connectDB } from './config/db'
import { SortMiddleware } from './app/middlewares/SortMiddleware'

// Connect MongoDB
connectDB(mongoURL)

const app = express()
const hbs = create({
    extname: ext,
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: '<i class="fa-sharp fa-solid fa-sort"></i>',
                asc: '<i class="fa-sharp fa-solid fa-arrow-down-a-z"></i>',
                desc: '<i class="fa-sharp fa-solid fa-arrow-down-z-a"></i>',
            }
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }
            const icon = icons[sortType]
            const type = types[sortType]

            return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`
        },
    },
})

// Apply Midlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.use(methodOverride('_method'))

// Custom Middleware
app.use(SortMiddleware)

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

app.get(
    '/middleware',
    (req, res, next) => {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = 'Test face'
            return next()
        }
        res.status(403).json({ message: 'access denied' })
    },
    (req, res, next) => {
        res.json({
            message: 'success',
            face: req.face,
        })
    },
)

// HTTP logger
app.use(morgan('combined'))

// Template Engine
app.engine(ext, hbs.engine)
app.set('view engine', ext)
app.set('views', path.join(__dirname, 'resources', 'views'))

// Routes Init
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`), console.log(`App listening on port ${port}`)
})
