import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import formData from 'express-form-data';
import morgan from 'morgan';

// Load environment variables
import './config/env';

// Load server configuration
import { API_VERSION, CLIENT_ORIGIN, PORT } from './config/server';

// Import route handlers
import routes from './routes';

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

// Connect index route
app.use(`/api/v${API_VERSION}`, routes);

export default app;
