/**
 * Wraps an async route handler and forwards any errors to Express's
 * error-handling middleware, avoiding repetitive try/catch blocks.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
