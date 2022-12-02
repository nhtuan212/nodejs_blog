const Course = require('../models/Course');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class CourseController {
    // [GET]/course
    list = async (req, res, next) => {
        Course.find({})
            .then((courses) => {
                return res.render('course', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    };

    // [GET]/course/:slug
    detail = (req, res, next) => {
        console.log({
            slug: req.params.slug,
        });

        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                return res.render('courses/detail', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    };
}

module.exports = {
    courseController: new CourseController(),
};
