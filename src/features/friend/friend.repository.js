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
  async acceptRequest(id, userId) {
    try {
      const mainUser = await UserModel.findOne({ _id: id }); //token user
      const requestUser = await UserModel.findOne({ _id: userId }); //param user
      if (mainUser) {
        if (mainUser.follower.includes(userId)) {
          throw new Error("User already accepted");
        } else {
          mainUser.follower.push(userId);
          const accepted = await mainUser.save();
          const removeFromPendingRequest = await FriendModel.findOne({
            _id: accepted.friendId._id
          });
          removeFromPendingRequest.requests =
            removeFromPendingRequest.requests.filter((id) => {
              return id.toString() != userId.toString();
            });
          await removeFromPendingRequest.save();
        }

        if (!requestUser.follower.includes(id)) {
          requestUser.follower.push(id);
          await requestUser.save();
        }
        return mainUser;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async rejectRequest(id, userId) {
    try {
      const mainUser = await UserModel.findOne({ _id: id }); //token user
      const requestUser = await UserModel.findOne({ _id: userId }); //param user
      if (mainUser) {
        const removeFromPendingRequest = await FriendModel.findOne({
          _id: mainUser.friendId._id
        });
        removeFromPendingRequest.requests =
          removeFromPendingRequest.requests.filter((id) => {
            return id.toString() != userId.toString();
          });
        await removeFromPendingRequest.save();
        return "Friend Request Rejected";
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async unfollow(id, userId) {
    try {
      const mainUser = await UserModel.findOne({ _id: id }); //token user
      const requestUser = await UserModel.findOne({ _id: userId }); //param user
      if (mainUser) {
        const totalFollowers = mainUser.follower.length;
        mainUser.follower = mainUser.follower.filter((id) => {
          return id.toString() != userId.toString();
        });
        await mainUser.save();
        if (totalFollowers - 1 == mainUser.follower) {
          return "Friend Unfollow";
        }
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async getFriends(userId) {
    try {
      const userWithFriends = await UserModel.findOne({ _id: userId }).populate(
        "follower",
        "_id name gender"
      );

      if (userWithFriends && userWithFriends.follower.length > 0) {
        return userWithFriends.follower;
      } else {
        return "No Friends";
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async getPendingRequests(userId) {
    try {
      const mainUser = await UserModel.findOne({ _id: userId });
      if (mainUser) {
        const pendingListId = await FriendModel.findById(
          mainUser.friendId._id
        ).populate("requests", "_id name gender");
        if (
          pendingListId &&
          pendingListId.requests &&
          pendingListId.requests.length > 0
        ) {
          return pendingListId.requests;
        } else {
          return "No pending requests";
        }
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
