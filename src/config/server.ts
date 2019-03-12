// API
const API_VERSION = 1;

// Port
const PORT = process.env.PORT || 5000;

// Client origin
const whitelist = {
  development: [
    'http://localhost:3000',
    'http://localhost:6006',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:6006',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081'
  ],
  production: ['https://gyararii.herokuapp.com', 'https://gyararii.netlify.com']
};

const CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? whitelist.production
    : whitelist.development;

export { API_VERSION, CLIENT_ORIGIN, PORT };
