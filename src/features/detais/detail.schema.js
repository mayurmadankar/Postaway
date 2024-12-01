import mongoose from "mongoose";

export const detailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdPosts: [
    {
      postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    }
  ],
  commentedPosts: [
    {
      postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      },
      commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment" // Assuming you have a separate Comment schema
      }
    }
  ],
  likedPosts: [
    {
      postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    }
  ]
});

const Detail = mongoose.model("Detail", detailSchema);

export default Detail;
