import express from "express";
import FriendController from "./friend.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const friendRouter = express.Router();

const friendController = new FriendController();

friendRouter.post("/sendrequest/:id", jwtAuth, (req, res, next) => {
  friendController.sendFriendRequest(req, res, next);
});
friendRouter.post("/acceptrequest/:id", jwtAuth, (req, res, next) => {
  friendController.acceptFriendRequest(req, res, next);
});
friendRouter.post("/rejectrequest/:id", jwtAuth, (req, res, next) => {
  friendController.rejectFriendRequest(req, res, next);
});
friendRouter.post("/unfollow/:id", jwtAuth, (req, res, next) => {
  friendController.unfollowFriend(req, res, next);
});
friendRouter.get("/get-friends", jwtAuth, (req, res, next) => {
  friendController.getFriends(req, res, next);
});
friendRouter.get("/get-pending-requests", jwtAuth, (req, res, next) => {
  friendController.getPendingRequests(req, res, next);
});
export default friendRouter;
