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
}
