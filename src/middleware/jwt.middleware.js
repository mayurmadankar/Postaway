import jwt from "jsonwebtoken";
import CustomError from "./customError.middleware.js";

const jwtAuth = (req, res, next) => {
  // 1. Read the token from the 'Authorization' header
  const token = req.headers["authorization"];

  // 2. If no token, return an error
  if (!token) {
    return next(new CustomError(401, "Access denied. No token provided."));
  }

  // 3. Check if the token is valid
  try {
    const decoded = jwt.verify(token, "Np1feZQmW6aIC44XK4KFRBFoSbbwG4tL");
    if (!decoded) {
      return next(new CustomError(401, "Invalid token."));
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next(); // Move to the next middleware
  } catch (error) {
    return next(new CustomError(500, "Internal Server Error"));
  }
};

export default jwtAuth;
