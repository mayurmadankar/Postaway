import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async addLike(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.userId;
      // console.log(userId);
      const likeAdded = await this.likeRepository.addLike(postId, userId);
      if (likeAdded) {
        res.status(200).send({
          success: true,
          message: "Post Like successfully",
          data: likeAdded
        });
      } else {
        res
          .status(400)
          .send({ success: false, message: "Like could not added", data: [] });
      }
    } catch (error) {
      next(error);
    }
  }
  async getLike(req, res, next) {
    try {
      const postId = req.params.id;
      const likePostList = await this.likeRepository.get(postId);
      if (likePostList)
        res.status(200).send({
          success: true,
          message: "Post Like count retrieved successfully!",
          data: likePostList
        });
      else
        res.status(400).send({
          success: false,
          message: "Post Like count not found!",
          data: 0
        });
    } catch (error) {
      next(error);
    }
  }
  async toggleLike(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.userId;
      const toggleLike = await this.likeRepository.toggle(postId, userId);
      if (toggleLike)
        res.status(201).send({
          success: true,
          message: "Like toggle successfully!",
          data: toggleLike
        });
      else
        res.status(400).send({
          success: false,
          message: "Like not toggled!",
          data: toggleLike
        });
    } catch (error) {
      next(error);
    }
  }
}
