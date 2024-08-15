import express from "express";
import PostController from "./postController.js";
import { fileUpload } from "../../middleware/fileUpload.middleware.js";

const PostRouter = express.Router();

let postcontroller = new PostController();

PostRouter.post("/", postcontroller.createPost);

// POST /api/user/upload-image - upload post image
PostRouter.post("/upload-image", fileUpload, (req, res) => {
  // Access uploaded file details via req.file
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // Handle file upload success
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename
  });
});

//get all post
PostRouter.get("/", postcontroller.getAllPost);

//Get post by id
PostRouter.get("/:id", postcontroller.getPostById);

// Update a post
PostRouter.put("/:id", postcontroller.updatePost);

//Delete a post
PostRouter.delete("/:id", postcontroller.deletePost);

export default PostRouter;
