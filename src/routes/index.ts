import { Response, Request, Router } from 'express';

// Creates a new router object
const router = Router();

// Root route
router.route('/').get(
  (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Welcome to Gyararī API!' });
  }
);

export default router;
