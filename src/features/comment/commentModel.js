export default class CommentModel {
  constructor(id, postId, content) {
    this.id = id;
    this.postId = postId;
    this.content = content;
  }
  createComment(userId, postId, content) {
    // Generate a new ID based on the highest existing ID
    const newId =
      comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1;

    const newComment = new CommentModel(newId, postId, content);
    comments.push(newComment);
    return newComment;
  }
  //get all comments from specfic post by id
  getAllCommentsForPost(postId) {
    const postComments = comments.filter(
      (comment) => comment.postId === postId
    );
    return postComments;
  }
  updateComment(commentId, content) {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex !== -1) {
      comments[commentIndex].content = content;
      return comments[commentIndex];
    }
    return null;
  }
  deleteComment(commentId) {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex !== -1) {
      comments.splice(commentIndex, 1);
      return true;
    }
    return false;
  }
}

// Dummy comment data (for in-memory operations)
let comments = [
  { id: 1, userId: 1, postId: 1, content: "First comment on post 1" },
  { id: 2, userId: 2, postId: 1, content: "Second comment on post 1" },
  { id: 3, userId: 3, postId: 2, content: "First comment on post 2" }
];
