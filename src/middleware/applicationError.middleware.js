// Custom Error class
export default class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCodecode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res.status(err.code).send({ success: false, message: err.message });
  }
};
