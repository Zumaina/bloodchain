// backend/src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // If response code not set, default to 500 (server error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // stack only shown in development for easier debugging
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
