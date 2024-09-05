import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const postRouter = express.Router();

const postcontroller = new PostController();

postRouter.post("/", upload.single("image"), (req, res, next) => {
  postcontroller.createPost(req, res, next);
});
postRouter.get("/", (req, res, next) =>
  postcontroller.getPostByUser(req, res, next)
);
postRouter.get("/all", (req, res, next) =>
  postcontroller.getAllPost(req, res, next)
);
postRouter.get("/:postId", (req, res, next) =>
  postcontroller.getPostById(req, res, next)
);
postRouter.put("/:postId", upload.single("image"), (req, res, next) =>
  postcontroller.updatePost(req, res, next)
);
postRouter.delete("/:postId", (req, res, next) =>
  postcontroller.deletePost(req, res, next)
);
export default postRouter;
