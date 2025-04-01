const cors = require('cors');

const configureCors = () => {
  return cors({
    // origin => This specifies the origin(s) allowed to access the API
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:7000',
        'https://your-custom-domain.com',
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); //
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true, // Enables support for cookies
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  });
};

module.exports = { configureCors };
