import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  async addComment(req, res, next) {
    try {
      const postId = req.params.postId;
      const { comment } = req.body;
      const userId = req.userId;
      const createdComment = await this.commentRepository.add(
        postId,
        userId,
        comment
      );
      if (createdComment)
        res.status(201).send({
          success: true,
          message: "Comment created successfully!",
          data: createdComment
        });
      else
        res
          .status(400)
          .send({ success: false, message: "Comment not created!", data: [] });
    } catch (error) {
      next(error);
    }
  }
  async getComment(req, res, next) {
    try {
      const postId = req.params.postId;
      const result = await this.commentRepository.get(postId);
      if (result)
        res.status(200).send({
          success: true,
          message: "Comment retrieved successfully!",
          data: result
        });
      else
        res.status(400).send({
          success: false,
          message: "Comment not retrieved!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async updateComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const userId = req.userId;
      const { newComment } = req.body;
      const result = await this.commentRepository.update(
        userId,
        commentId,
        newComment
      );
      if (result)
        res.status(200).send({
          success: true,
          message: "Comment updated successfully!",
          data: result
        });
      else
        res
          .status(400)
          .send({ success: false, message: "Comment not updated!", data: [] });
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const userId = req.userId;
      const result = await this.commentRepository.delete(userId, commentId);
      if (result.modifiedCount == 1)
        res
          .status(200)
          .send({ success: true, message: "Comment deleted successfully!" });
      else
        res
          .status(400)
          .send({ success: false, message: "Comment not deleted!" });
    } catch (error) {
      next(error);
    }
  }
}
