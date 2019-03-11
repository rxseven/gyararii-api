import Router from 'express-promise-router';

import galleryController from '../controllers/gallery';

// Creates a new router object
const router = Router();

// Route handlers
router.route('/').get(galleryController.getImages);

export default router;
