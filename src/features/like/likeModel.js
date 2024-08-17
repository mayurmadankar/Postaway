export default class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }

  addLike(userId, postId) {
    // Create a new like with an incremental ID
    const newLike = new LikeModel(likes.length + 1, userId, postId);

    // Add the new like to the likes array
    likes.push(newLike);

    // Return the newly created like
    return newLike;
  }
  removeLike(likeId) {
    const likeIndex = likes.findIndex((like) => like.id === likeId);
    if (likeIndex !== -1) {
      likes.splice(likeIndex, 1);
      return true;
    }
    return false;
  }
  getAllLikesForPost(postId) {
    return likes.filter((like) => like.postId === postId);
  }
}

// Dummy like data (for in-memory operations)
let likes = [
  { id: 1, userId: 1, postId: 1 },
  { id: 2, userId: 2, postId: 2 },
  { id: 3, userId: 3, postId: 3 }
];
