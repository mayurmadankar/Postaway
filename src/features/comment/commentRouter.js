import express from "express";
import CommentController from "./commentController.js";
import PostRouter from "../post/postRouter.js";

//creating express routes
const commentRouter = express();

// instance of the CommentController class
let commentcontroller = new CommentController();

//create new Comment
commentRouter.post("/", commentcontroller.createComment);

//get all Comment
commentRouter.get("/", commentcontroller.getAllCommentsForPost);

//Update a comment
commentRouter.put("/:id", commentcontroller.updateComment);

//Delete a comment
commentRouter.delete("/:id", commentcontroller.deleteComment);

export default commentRouter;
