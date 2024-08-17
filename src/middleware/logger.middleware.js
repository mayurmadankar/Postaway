// src/middlewares/logger.middleware.js

import winston from "winston";

// Create a custom format that includes a timestamp
const customFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Adds a timestamp to the log
    customFormat // Custom format to include timestamp
  ),
  transports: [
    new winston.transports.File({ filename: "combined.log" }) // Log to 'combined.log' file
  ]
});

// Logger middleware function
export const loggerMiddleware = (req, res, next) => {
  // Construct the log message
  const logData = `Request URL: ${req.url} | Request Body: ${JSON.stringify(
    req.body
  )}`;

  // Log the request information
  logger.info(logData);

  // Proceed to the next middleware or route handler
  next();
};

export default loggerMiddleware;
