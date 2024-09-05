import ApplicationError from "../../middleware/applicationError.middleware.js";
import mongoose from "mongoose";
import { PostModel } from "./post.schema.js";

export default class PostRepository {
  async create(caption, description, image, userId) {
    try {
      const newPost = new PostModel({
        caption,
        description,
        image,
        userId: new mongoose.Types.ObjectId(userId)
      });
      let savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async getPostUsingUserId(userId) {
    try {
      return await PostModel.find({
        userId: new mongoose.Types.ObjectId(userId)
      }).populate("userId", "_id name emailId");
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async getAll() {
    try {
      return await PostModel.find({}).populate("userId", "_id name emailId");
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async getPostUsingId(id) {
    try {
      return await PostModel.findById({ _id: id }).populate(
        "userId",
        "_id name emailId"
      );
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async update(caption, description, image, postId, userId) {
    try {
      const post = await PostModel.findOne({ _id: postId, userId: userId });
      if (!post) {
        throw new Error("Post not found");
      }
      post.caption = caption;
      post.description = description;
      post.image = image;
      return await post.save();
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async delete(postId, userId) {
    try {
      const post = await PostModel.findOne({ _id: postId, userId: userId });
      if (!post) {
        throw new Error("Post not found");
      }
      return await PostModel.deleteOne({ _id: postId });
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
