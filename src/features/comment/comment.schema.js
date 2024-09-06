import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comments: [
    {
      comment: {
        type: String
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

export const CommentModel = mongoose.model("Comment", commentSchema);
