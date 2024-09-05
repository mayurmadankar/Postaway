import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const postRouter = express.Router();

const postcontroller = new PostController();

postRouter.post("/", upload.single("image"), (req, res, next) => {
  postcontroller.createPost(req, res, next);
});
export default postRouter;
