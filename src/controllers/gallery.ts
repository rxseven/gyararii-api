/* eslint-disable @typescript-eslint/camelcase */
import cloudinary from 'cloudinary';
import { Response, Request } from 'express';
import { has } from 'lodash';

// Cloudinary configuration
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

// Get images
function getImages(req: Request, res: Response): void {
  interface Options {
    max_results: number;
    next_cursor?: string;
    resource_type: string;
    type: string;
  }

  interface Result {
    next_cursor: string;
    rate_limit_allowed: number;
    rate_limit_remaining: number;
    rate_limit_reset_at: string;
    resources: object[];
  }

  const options: Options = {
    max_results: 10,
    resource_type: 'image',
    type: 'upload'
  };

  if (has(req.query, 'next_cursor')) {
    options.next_cursor = req.query.next_cursor;
  }

  if (has(req.query, 'max_results')) {
    options.max_results = req.query.max_results;
  }

  // Fetch images from Cloudinary
  cloudinary.v2.api
    .resources(options)
    .then((results: Result) => res.json(results))
    .catch(() => {
      res.status(500).send({
        message: 'Something went wrong',
        status: 'error'
      });
    });
}

export default { getImages };
