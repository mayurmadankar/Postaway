import ApplicationError from "../../middleware/applicationError.middleware.js";
import mongoose from "mongoose";
import { PostModel } from "./post.schema.js";
import Detail from "../detais/detail.schema.js";

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

      // Update the user's details in the `Detail` schema
      await Detail.updateOne(
        { user: userId }, // Find the user's details by their ID
        {
          $push: {
            createdPosts: {
              postID: savedPost._id // Add the post ID to `createdPosts`
            }
          }
        },
        { upsert: true } // Create a new `Detail` document if none exists for the user
      );

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
