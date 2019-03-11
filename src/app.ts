import express from 'express';
import morgan from 'morgan';

// Load environment variables
import './config/env';

// Load server configuration
import { PORT } from './config/server';

// Create Express app
const app: express.Application = express();

// App configuration
app.set('port', PORT);

// HTTP request logger
app.use(morgan('dev'));

export default app;
