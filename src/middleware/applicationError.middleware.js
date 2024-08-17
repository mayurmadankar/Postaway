// Custom Error class
export default class ApplicationError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send("oops! something went wrong...Try again later!");
  }
  next();
};
