import ApplicationError from "../../middleware/applicationError.middleware.js";
import { PostModel } from "../post/post.schema.js";
import { UserModel } from "../user/user.schema.js";
import { LikeModel } from "./like.schema.js";

export default class LikeRepository {
  async addLike(postId, userId) {
    try {
      const result = await LikeModel.create({
        postId: postId,
        userId: userId
      });
      await PostModel.updateOne(
        { _id: postId },
        { $set: { likeId: result._id } }
      );
      return result;
    } catch (error) {
      throw new ApplicationError(error.message, 400);
    }
  }

  async get(postId) {
    try {
      const likePost = await LikeModel.findOne({ postId: postId });
      //   console.log(postId);
      //   console.log(likePost);
      if (!likePost) {
        throw new ApplicationError("Post not found", 400);
      }

      return likePost.userId.length;
    } catch (error) {
      throw new ApplicationError(error.message, 400);
    }
  }
  async toggle(postId, userId) {
    try {
      const likePost = await LikeModel.findOne({ postId: postId });
      let createLike;

      if (!likePost) {
        const newLikePost = new LikeModel({
          postId: postId,
          userId: [userId]
        });
        createLike = await newLikePost.save();
        if (createLike)
          await PostModel.updateOne(
            { _id: postId },
            { $set: { likeId: createLike._id } }
          );
      } else {
        if (likePost.userId.includes(userId)) {
          likePost.userId = likePost.userId.filter(
            (id) => id.toString() != userId.toString()
          );
        } else {
          likePost.userId.push(userId);
        }
        createLike = await likePost.save();
      }
      return createLike;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
