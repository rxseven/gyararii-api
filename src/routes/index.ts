import { Response, Request, Router } from 'express';

import gallery from './gallery';

// Creates a new router object
const router = Router();

// Nested routes
router.use('/gallery', gallery);

// Root route
router.route('/').get(
  (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Welcome to Gyararī API!' });
  }
);

export default router;
