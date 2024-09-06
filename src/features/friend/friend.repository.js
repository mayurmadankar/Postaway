import ApplicationError from "../../middleware/applicationError.middleware.js";
import { UserModel } from "../user/user.schema.js";
import { FriendModel } from "./friend.schema.js";

export default class FriendRepository {
  async sendRequest(id, userId) {
    try {
      const friendUserFound = await FriendModel.findOne({ userId: id });
      let newFriendUser;
      if (!friendUserFound) {
        const newFriendUserRequest = new FriendModel({
          userId: id,
          requests: [userId]
        });
        newFriendUser = await newFriendUserRequest.save();
        if (newFriendUser)
          await UserModel.updateOne(
            { _id: id },
            { $set: { friendId: newFriendUser._id } }
          );
      } else {
        friendUserFound.requests.push(userId);
        newFriendUser = await friendUserFound.save();
      }
      return newFriendUser;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
