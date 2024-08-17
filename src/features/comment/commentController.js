import userModel from "../user/userModel.js";
import PostModel from "../post/postModel.js";
import CommentModel from "./commentModel.js";

let usermodel = new userModel();
let postmodel = new PostModel();
let commentmodel = new CommentModel();

export default class CommentController {
  //create new comment
  createComment(req, res) {
    const { userId, postId, content } = req.body;
    const user = usermodel.getAllUsers().find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    const post = postmodel.getAllPosts().find((p) => p.id === parseInt(postId));
    if (!post) {
      throw new Error("Post not found");
    }
    const newComment = commentmodel.createComment(userId, postId, content);
    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  }
  //get all comments
  getAllCommentsForPost(req, res) {
    const postId = parseInt(req.query.postId);
    // console.log(postId);
    const post = postmodel.getAllPosts().find((p) => p.id === postId);
    // console.log(post);
    if (!post) {
      throw new Error("Post not found");
    }
    const postComments = commentmodel.getAllCommentsForPost(postId);
    res.status(200).json(postComments);
  }
  //update the comment by id
  updateComment(req, res) {
    console.log("hello");
    const commentId = parseInt(req.params.id);
    console.log(commentId);
    const { content } = req.body;
    console.log(content);
    const updatedComment = commentmodel.updateComment(commentId, content);
    if (updatedComment) {
      res.status(200).json({
        message: "Comment updated successfully",
        comment: updatedComment
      });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  }
  deleteComment(req, res) {
    const commentId = parseInt(req.params.id);
    const isDeleted = commentmodel.deleteComment(commentId);
    if (isDeleted) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  }
}
