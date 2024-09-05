import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    maxLength: [25, "Name can't be greater than 25 charcaters"]
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  },
  likeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Like"
  }
});

export const PostModel = mongoose.model("Post", postSchema);
