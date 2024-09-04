import jwt from "jsonwebtoken";
import { blackListedToken } from "../features/user/user.controller.js";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("No token, authorization denied");

  if (blackListedToken.has(token)) {
    return res.status(401).send("Token is not valid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
  } catch (error) {
    return res.status(401).send("Token is not valid");
  }
  next();
};

export default jwtAuth;
