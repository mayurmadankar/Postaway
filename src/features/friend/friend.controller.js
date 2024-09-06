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
}
