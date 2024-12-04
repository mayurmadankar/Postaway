import Detail from "./detail.schema.js";

export default class DetailRepository {
  async getDetailsByUser(userId) {
    try {
      // Fetch the user's interaction details
      const details = await Detail.findOne({ user: userId })
        .populate("user")
        .populate("createdPosts.postID", "title content")
        .populate("commentedPosts.postID", "title")
        .populate("commentedPosts.commentID", "text")
        .populate("likedPosts.postID", "title")
        .populate("likedPosts.likeID","title")
        .lean();

      return details;
    } catch (error) {
      throw new Error(
        `Failed to fetch details for user ${userId}: ${error.message}`
      );
    }
  }
}
