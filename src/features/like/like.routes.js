import express from "express";
import LikeController from "./like.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
const likeRouter = express.Router();

const likecontroller = new LikeController();

likeRouter.post("/:id", (req, res, next) => {
  likecontroller.addLike(req, res, next);
});
likeRouter.get("/:id", (req, res, next) =>
  likecontroller.getLike(req, res, next)
);
likeRouter.post("/toggle/:id", jwtAuth, (req, res, next) =>
  likecontroller.toggleLike(req, res, next)
);
export default likeRouter;
