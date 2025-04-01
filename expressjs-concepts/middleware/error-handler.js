class APIError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.name = 'APIError'; // Set the error type to API Error
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (error, req, res, next) => {
  console.error(error.stack); // Log the error stack

  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  // Handle mongoose validation
  else if (error.name === 'validationError') {
    return res.status(400).json({
      status: 'Error',
      message: 'Validation Error',
    });
  } else {
    return res.status(500).json({
      status: 'Error',
      message: 'An unexpected error occurred',
    });
  }
};

module.exports = { APIError, asyncHandler, globalErrorHandler };
