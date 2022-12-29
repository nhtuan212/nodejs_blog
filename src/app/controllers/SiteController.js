const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // [GET]/
    index = (req, res, next) => {
        Course.find({})
            .then((courses) => {
                return res.render('home', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next)

        // try {
        // 	let courses = await Course.find({});
        // 	return res.render('home', { courses: multipleMongooseToObject(courses) });

        // 	// Only render JSON
        // 	// res.json({ courses })
        // } catch(err) {
        // 	throw(err)
        // }
    }

    // [GET]/search
    search = (req, res) => {
        res.render('search')
    }
}

module.exports = {
    siteController: new SiteController()
}
