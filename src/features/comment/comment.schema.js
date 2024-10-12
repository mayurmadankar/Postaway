import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
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
  ]
});

export const CommentModel = mongoose.model("Comment", commentSchema);
