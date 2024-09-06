import FriendRepository from "./friend.repository.js";

export default class FriendConroller {
  constructor() {
    this.friendRepository = new FriendRepository();
  }

  async sendFriendRequest(req, res, next) {
    try {
      const id = req.userId; // user id found in the token

      const userId = req.params.id; //user id pass in params

      const requestSent = await this.friendRepository.sendRequest(id, userId);
      if (requestSent)
        res.status(200).send({
          success: true,
          message: "friend request sent successfully!",
          data: requestSent
        });
      else
        res.status(400).send({
          success: false,
          message: "friend request not sent!",
          data: []
        });
    } catch (error) {
      next(error);
    }
  }
  async acceptFriendRequest(req, res, next) {
    try {
      const id = req.userId;
      const userId = req.params.id;
      const requestAccepted = await this.friendRepository.acceptRequest(
        id,
        userId
      );
      if (requestAccepted)
        res.status(200).send({
          success: true,
          message: "friend request accepted successfully!"
        });
      else
        res
          .status(400)
          .send({ success: false, message: "friend request not accepted!" });
    } catch (error) {
      next(error);
    }
  }
  async rejectFriendRequest(req, res, next) {
    try {
      const id = req.userId;
      const userId = req.params.id;
      const requestRejected = await this.friendRepository.rejectRequest(
        id,
        userId
      );
      if (requestRejected)
        res.status(200).send({
          success: true,
          message: "friend request rejected successfully!"
        });
      else
        res
          .status(400)
          .send({ success: false, message: "friend request not rejected!" });
    } catch (error) {
      next(error);
    }
  }
  async unfollowFriend(req, res, next) {
    try {
      const id = req.userId;
      const userId = req.params.id;
      const requestUnfollow = await this.friendRepository.unfollow(id, userId);
      if (requestUnfollow)
        res.status(200).send({
          success: true,
          message: "friend request unfollow successfully!"
        });
      else
        res
          .status(400)
          .send({ success: false, message: "friend request not unfollow!" });
    } catch (error) {
      next(error);
    }
  }
  async getFriends(req, res, next) {
    try {
      const userId = req.userId;
      const followers = await this.friendRepository.getFriends(userId);
      if (followers) {
        res.status(200).send({
          success: true,
          message: "List of all friends",
          data: [followers]
        });
      } else {
        res
          .status(400)
          .send({ success: false, message: "No followers found", data: [] });
      }
    } catch (error) {
      next(error);
    }
  }
  async getPendingRequests(req, res, next) {
    try {
      const userId = req.userId; //from token
      const pendingRequest = await this.friendRepository.getPendingRequests(
        userId
      );
      if (pendingRequest) {
        res.status(200).send({
          success: true,
          messgae: "List of pending request",
          data: [pendingRequest]
        });
      } else {
        res
          .status(400)
          .send({ success: false, message: "No Pending Request", data: [] });
      }
    } catch (error) {
      next(error);
    }
  }
}
