import express from "express";
import userController from "./user.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const userRouter = express.Router();

let usercontroller = new userController();

//register user
userRouter.post("/signup", upload.single("avatar"), (req, res, next) => {
  usercontroller.signUp(req, res, next);
});
//login user
userRouter.post("/signin", (req, res, next) => {
  usercontroller.signIn(req, res, next);
});
//logout user
userRouter.post("/logout", jwtAuth, (req, res, next) => {
  usercontroller.signOut(req, res, next);
});

userRouter.get("/get-all-details", jwtAuth, (req, res, next) => {
  usercontroller.getAllUserDetail(req, res, next);
});
userRouter.get("/get-details/:id", jwtAuth, (req, res, next) => {
  usercontroller.getDetailByUser(req, res, next);
});
userRouter.put(
  "/update-details/:id",
  jwtAuth,
  upload.single("avatar"),
  (req, res, next) => {
    usercontroller.updateUserDetail(req, res, next);
  }
);
userRouter.put("/resetPassword", jwtAuth, (req, res, next) => {
  usercontroller.resetPassword(req, res, next);
});

export default userRouter;
