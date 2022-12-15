const express = require('express');
const router = express.Router();
const { courseController } = require('../app/controllers/CourseController');
const { upload } = require('../app/middlewares/UploadMiddleware');

// router.get('/create',
// 	(req, res, next) => {
// 		if (req.query.test === 'test-middleware') return next()
// 		res.status(403).json({ message: 'access denied' })
// 	}, courseController.create);
router.post('/upload', upload.single('image'), courseController.upload);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/trash', courseController.trash);
router.delete('/:id/delete', courseController.delete);
router.get('/:slug', courseController.detail);
router.get('/', courseController.list);
module.exports = router;
