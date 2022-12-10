const NewsRouter = require('./news');
const SiteRouter = require('./site');
const CourseRouter = require('./courses');
const MeRouter = require('./me');

exports.route = (app) => {
    app.use('/.netlify/functions/', SiteRouter);
    app.use('/.netlify/functions/news', NewsRouter);
    app.use('/.netlify/functions/courses', CourseRouter);
    app.use('/.netlify/functions/me', MeRouter);
};
