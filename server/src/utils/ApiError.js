/**
 * Custom error class carrying an HTTP status code, used so the central
 * error middleware can respond with the correct status + message.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
