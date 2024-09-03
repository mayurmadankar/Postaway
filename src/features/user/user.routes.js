import express from "express";
import userController from "./user.controller.js";
import { fileUpload } from "../../middleware/fileUpload.middleware.js";

const userRouter = express.Router();

let usercontroller = new userController();

//register user
userRouter.post("/signup", fileUpload, (req, res, next) =>
  usercontroller.signUp(req, res, next)
);
//login user
userRouter.post("/signin", (req, res, next) =>
  usercontroller.signIn(req, res, next)
);

export default userRouter;
