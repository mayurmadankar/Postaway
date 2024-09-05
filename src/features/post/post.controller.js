import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }
  async createPost(req, res, next) {
    try {
      const { caption, description } = req.body;
      const userId = req.userId;
      const image = req.file.filename;

      const postCreated = await this.postRepository.create(
        caption,
        description,
        image,
        userId
      );
      if (postCreated._id)
        res.status(201).send({
          success: true,
          message: "Post has been created successfully!",
          data: postCreated
        });
      else
        res.status(400).send({
          success: false,
          message: "Post has not been created!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async getPostByUser(req, res, next) {
    try {
      const userId = req.userId;
      const post = await this.postRepository.getPostUsingUserId(userId);
      if (post)
        res.status(201).send({
          success: true,
          message: "Post has been retrieved successfully!",
          data: post
        });
      else
        res.status(400).send({
          success: false,
          message: "Post has not been found!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async getAllPost(req, res, next) {
    try {
      const posts = await this.postRepository.getAll();
      if (posts)
        res.status(201).send({
          success: true,
          message: "Post has been retrieved successfully!",
          data: posts
        });
      else
        res.status(400).send({
          success: false,
          message: "Post has not been found!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async getPostById(req, res) {
    try {
      const postId = req.params.postId;
      const post = await this.postRepository.getPostUsingId(postId);
      if (post)
        res.status(201).send({
          success: true,
          message: "Post has been retrieved successfully!",
          data: post
        });
      else
        res.status(400).send({
          success: false,
          message: "Post has not been found!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async updatePost(req, res, next) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
      const { caption, description } = req.body;
      const image = req.file.filename;

      const updatePost = await this.postRepository.update(
        caption,
        description,
        image,
        postId,
        userId
      );
      if (updatePost)
        res.status(201).send({
          success: true,
          message: "Post has been updated successfully!",
          data: updatePost
        });
      else
        res.status(400).send({
          success: false,
          message: "Post has not been updated!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async deletePost(req, res, next) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;
      const deletedPost = await this.postRepository.delete(postId, userId);
      if (deletedPost.deletedCount > 0)
        res.status(201).send({
          success: true,
          message: "Post has been deleted successfully!"
        });
      else
        res.status(400).send({
          success: false,
          message: "Post has not been deleted!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
}
