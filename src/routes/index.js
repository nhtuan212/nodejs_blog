const NewsRouter = require('./news');
const SiteRouter = require('./site');
const CourseRouter = require('./courses');
const MeRouter = require('./me');

exports.route = (app) => {
    app.use('/', SiteRouter);
    app.use('/news', NewsRouter);
    app.use('/courses', CourseRouter);
    app.use('/me', MeRouter);
};
