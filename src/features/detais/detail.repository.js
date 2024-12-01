import Detail from "./detail.schema.js";

export default class DetailRepository {
  async getDetailsByUser(userId) {
    try {
      // Fetch the user's interaction details
      const details = await Detail.findOne({ user: userId })
        .populate("createdPosts.postID", "title content") // Example fields from Post
        .populate("commentedPosts.postID", "title")
        .populate("commentedPosts.commentID", "text") // Example fields from Comment
        .populate("likedPosts.postID", "title")
        .lean();

      return details;
    } catch (error) {
      throw new Error(
        `Failed to fetch details for user ${userId}: ${error.message}`
      );
    }
  }
}
