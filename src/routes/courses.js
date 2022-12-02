const express = require('express');
const router = express.Router();
const { courseController } = require('../app/controllers/CourseController');
router.get('/:slug', courseController.detail);
router.get('/', courseController.list);
module.exports = router;
