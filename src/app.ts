import express from 'express';

// Load environment variables
import './config/env';

// Load server configuration
import { PORT } from './config/server';

// Create Express app
const app: express.Application = express();

// App configuration
app.set('port', PORT);

export default app;
