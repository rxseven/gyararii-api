/* eslint-disable @typescript-eslint/camelcase */
import cloudinary from 'cloudinary';
import { Response, Request } from 'express';
import { has } from 'lodash';

// Constants
const uploadPath = 'playground/upload';

// Cloudinary configuration
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

// Interfaces
interface UploadRequest extends Request {
  files: object;
}

// Delete images
function deleteImages(req: Request, res: Response): void {
  interface Result {
    deleted: { [key: string]: string };
    partial: boolean;
    rate_limit_allowed: number;
    rate_limit_remaining: number;
    rate_limit_reset_at: string;
  }

  const { ids } = req.params;

  // Delete uploaded image from Coudinary by public ID
  cloudinary.v2.api
    .delete_resources(ids.split(','))
    .then((results: Result) => res.json(results))
    .catch(() => {
      res.status(500).send({
        message: 'Something went wrong',
        status: 'error'
      });
    });
}

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

// Upload images
function uploadImages(req: UploadRequest, res: Response): void {
  interface File {
    fieldName: string;
    headers: {
      'content-disposition': string;
      'content-type': string;
    };
    name: string;
    originalFilename: string;
    path: string;
    size: number;
    type: string;
  }

  // Return an array of a given object's own enumerable property values
  const files: File[] = Object.values(req.files);

  // Upload files to Cloudinary and return promises
  const promises = files.map((image: File) => {
    return cloudinary.v2.uploader.upload(image.path, {
      folder: uploadPath
    });
  });

  // Return results
  Promise.all(promises)
    .then(results => res.json(results))
    .catch(() => {
      res.status(500).send({
        message: 'Something went wrong',
        status: 'error'
      });
    });
}

export default { deleteImages, getImages, uploadImages };
