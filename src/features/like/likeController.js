import LikeModel from "./likeModel.js";
import PostModel from "../post/postModel.js";
import userModel from "../user/userModel.js";

//create the instance of the class
let likemodel = new LikeModel();
let postmodel = new PostModel();
let usermodel = new userModel();

export default class LikeController {
  //adding likes
  addLike(req, res) {
    const { userId, postId } = req.body;
    const user = usermodel.getAllUsers().find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    const post = postmodel.getAllPosts().find((p) => p.id === postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const newLike = likemodel.addLike(userId, postId);
    res.status(201).json({ message: "Like added successfully", like: newLike });
  }
  //removing the likes
  removeLike(req, res) {
    const likeId = parseInt(req.params.id);
    // console.log(likeId);
    const isRemoved = likemodel.removeLike(likeId);
    if (isRemoved) {
      res.status(200).json({ message: "Like removed successfully" });
    } else {
      res.status(404).json({ message: "Like not found" });
    }
  }
  //get all likes from post likes
  getAllLikesForPost(req, res) {
    const postId = parseInt(req.query.postId);
    const postLikes = likemodel.getAllLikesForPost(postId);
    res.status(200).json(postLikes);
  }
}
