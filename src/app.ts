import cors from 'cors';
import express from 'express';
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

// CORS
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

export default app;
