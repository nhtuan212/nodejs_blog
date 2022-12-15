import path from 'path'
import { Resize } from '../../util/resize'
const Course = require('../models/Course')
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class CourseController {
	// [POST]/courses/upload
	upload = async (req, res, next) => {
		if (!req.file) {
			return res.status(401).json({ error: 'Please provide an image' });
		}

		// folder upload
		const imagePath = path.join(__dirname, '../../../public/images');

		// call class Resize
		// const fileUpload = new Resize(imagePath);
		// const filename = await fileUpload.save(req.file.buffer);
		
		const fileUpload = Resize({ imagePath, imageSize: "300x300", buffer: req.file.buffer });
		return res.status(200).json({ name: fileUpload });
	};

    // [GET]/course
    list = async (req, res, next) => {
        Course.find({})
            .then((courses) => {
                return res.render('courses/index', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    };

    // [GET]/course/:slug
    detail = (req, res, next) => {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                return res.render('courses/detail', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    };

    // [GET]/course/create
	create = (req, res, next) => {
		res.render('courses/create')
    };

    // [POST]/course/store
	store = (req, res, next) => {
		req.body.image = `https://files.fullstack.edu.vn/f8-prod/courses/6.png`
		const course = new Course(req.body);
		course.save()
			.then(() => res.redirect(`/me/stored/courses`))
			.catch(next)
    };

    // [GET]/courses/:id/edit
	edit = (req, res, next) => {
		Course.findById(req.params.id)
			.then(course => res.render('courses/edit', {
				course: mongooseToObject(course)
			}))
			.catch(next)
    };

    // [PUT]/courses/:id/
	update = (req, res, next) => {
		Course.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.redirect('/me/stored/courses'))
			.catch(next)
    };

	// [PATCH]/courses/:id/restore
	restore = (req, res, next) => {
		Course.restore({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next)
	};

	// [DELETE]/courses/:id/trash
	trash = (req, res, next) => {
		Course.delete({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next)
	};

	// [DELETE]/courses/:id/delete
	delete = (req, res, next) => {
		Course.deleteOne({ _id: req.params.id })
			.then(() => res.redirect('back'))
			.catch(next)
    };

	// [POST]/courses/handle-form-actions
	handleFormActions = (req, res, next) => {
		switch (req.body.action) {
			case 'trash':
				Course.delete({ _id: { $in: req.body.courseIds } })
					.then(() => res.redirect('back'))
					.catch(next)
				break
			default:
				// render json error
				break
		}
    };
}

module.exports = {
    courseController: new CourseController(),
};
