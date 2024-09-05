//1. import express
import express from "express";
import UserController from "../user/user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

//2. initialize express router
const otpRouter = express.Router();

const usercontroller = new UserController();

otpRouter.post("/send", (req, res, next) =>
  usercontroller.sendOtp(req, res, next)
);
otpRouter.post("/verify", jwtAuth, (req, res, next) =>
  usercontroller.verifyOtp(req, res, next)
);
otpRouter.put("/reset-password", jwtAuth, (req, res, next) =>
  usercontroller.resetPassword(req, res, next)
);

export default otpRouter;
