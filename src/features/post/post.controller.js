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
}
