import express from "express";
import userController from "./userController.js";

const userRouter = express.Router();

let usercontroller = new userController();

///register user
userRouter.post("/signup", usercontroller.signupUser);
//login user
userRouter.post("/signin", usercontroller.signinUser);

export default userRouter;
