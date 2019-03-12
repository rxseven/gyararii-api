// API
const API_VERSION = 1;

// Port
const PORT = process.env.PORT || 5000;

// Client origin
const whitelist = {
  development: ['http://localhost:3000'],
  production: ['https://gyararii.herokuapp.com']
};

const CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? whitelist.production
    : whitelist.development;

export { API_VERSION, CLIENT_ORIGIN, PORT };
