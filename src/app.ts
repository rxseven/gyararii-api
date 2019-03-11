import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import formData from 'express-form-data';
import morgan from 'morgan';

// Load environment variables
import './config/env';

// Load server configuration
import { CLIENT_ORIGIN, PORT } from './config/server';

// Create Express app
const app: express.Application = express();

// App configuration
app.set('port', PORT);

// HTTP request logger
app.use(morgan('dev'));

// Body parser
app.use(bodyParser.json());

// CORS
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Form data parser
app.use(formData.parse());

export default app;
