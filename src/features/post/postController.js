import userModel from "../user/userModel.js";
import PostModel from "./postModel.js";

let usermodel = new userModel();
let postmodel = new PostModel();

export default class PostController {
  createPost(req, res) {
    const { userId, caption, imageUrl } = req.body;
    // console.log(req.body);
    const user = usermodel.getAllUsers().find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    const newPost = postmodel.createPost(userId, caption, imageUrl);
    res
      .status(201)
      .json({ message: "Post created Successfully", post: newPost });
  }
  getAllPost(req, res) {
    const allPost = postmodel.getAllPost();
    res.status(200).json({ allPost });
  }
  getPostById(req, res) {
    const postId = parseInt(req.params.id);
    const post = postmodel.getPostById(postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  }
  updatePost(req, res) {
    const postId = parseInt(req.params.id);
    const { caption, imageUrl } = req.body;
    const updatedPost = postmodel.updatePost(postId, caption, imageUrl);
    if (updatedPost) {
      res
        .status(200)
        .json({ message: "Post updated successfully", post: updatedPost });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  }
  deletePost(req, res) {
    const postId = parseInt(req.params.id);
    const isDeleted = postmodel.deletePost(postId);
    if (isDeleted) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  }
}
