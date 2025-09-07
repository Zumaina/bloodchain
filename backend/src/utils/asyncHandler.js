// A tiny wrapper to avoid repetitive try/catch in async route handlers.
// Usage: router.post('/route', asyncHandler(controllerFn));

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
