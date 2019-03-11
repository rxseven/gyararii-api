// API
const API_VERSION = 1;

// Port
const PORT = process.env.PORT || 5000;

// Client origin
const CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://gyararii.herokuapp.com'
    : `http://localhost:3000`;

export { API_VERSION, CLIENT_ORIGIN, PORT };
