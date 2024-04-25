const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

// asyncHandler is a function that takes another function fn as an argument.

// The fn function is expected to be a typical Express route handler function that takes req, res, and next as arguments.

// asyncHandler returns a new function (also known as middleware) that also takes req, res, and next as arguments.

// This returned function is what you use as middleware in your Express route handlers to handle asynchronous operations and errors.