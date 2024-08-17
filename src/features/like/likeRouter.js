import express from "express";
import LikeController from "./likeController.js";

//crate a express router
const LikeRouter = express.Router();

//instance of controller class
let likecontroller = new LikeController();

//Add a Like
LikeRouter.post("/", likecontroller.addLike);

//Remove a Like
LikeRouter.delete("/:id", likecontroller.removeLike);

LikeRouter.get("/", likecontroller.getAllLikesForPost);

export default LikeRouter;
