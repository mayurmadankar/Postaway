import { CommentModel } from "./comment.schema.js";
import { PostModel } from "../post/post.schema.js";
import ApplicationError from "../../middleware/applicationError.middleware.js";
import Detail from "../details/detail.schema.js";

export default class CommentRepository {
  async add(postId, userId, comment) {
    try {
      const commentPost = await CommentModel.findOne({ postId: postId });
      let createComment;
      let newComment;
      if (!commentPost) {
        newComment = { comment: comment, userId: userId };
        const newCommentPost = new CommentModel({
          postId: postId,
          comments: [newComment]
        });
        createComment = await newCommentPost.save();
      } else {
        // If commentPost is found, push the new comment
        newComment = { comment: comment, userId: userId };
        commentPost.comments.push(newComment);
        createComment = await commentPost.save();
      }
      if (createComment) {
        await PostModel.updateOne(
          { _id: postId },
          { $set: { commentId: createComment._id } }
        );

        // Update the Detail model to track this user's comment
        await Detail.updateOne(
          { user: userId }, // Find by user ID
          {
            $push: {
              commentedPosts: {
                postID: postId,
                commentID:
                  createComment.comments[createComment.comments.length - 1]._id
              }
            }
          },
          { upsert: true } // Create a new Detail document if none exists for the user
        );
      }

      newComment._id = createComment._id;
      return newComment;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async get(postId) {
    try {
      return await CommentModel.findOne({ postId });
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async update(userId, commentId, newComment) {
    try {
      // Find the comment post by the specific comment ID and user ID
      const commentPost = await CommentModel.findOne({
        "comments._id": commentId,
        "comments.userId": userId
      });

      if (!commentPost) {
        throw new Error(
          "Comment not found or user is not authorized to update this comment."
        );
      }

      // Find the specific comment and update it
      const comment = commentPost.comments.id(commentId);
      if (comment) {
        comment.comment = newComment;
      } else {
        throw new Error("Comment not found.");
      }
      // Save the updated document
      const updatedCommentPost = await commentPost.save();
      return comment;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message, 500);
    }
  }
  async delete(userId, commentId) {
    try {
      const deleteComment = await CommentModel.updateOne(
        { "comments._id": commentId, "comments.userId": userId },
        { $pull: { comments: { _id: commentId, userId: userId } } }
      );

      if (deleteComment.matchedCount === 0) {
        throw new ApplicationError(
          "Comment not found or user is not authorized to delete this comment.",
          400
        );
      }

      return deleteComment;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
