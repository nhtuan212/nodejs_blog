const NewsRouter = require('./news');
const SiteRouter = require('./site');
const CourseRouter = require('./courses');

exports.route = (app) => {
    app.use('/', SiteRouter);
    app.use('/news', NewsRouter);
    app.use('/courses', CourseRouter);
};
