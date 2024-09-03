import ApplicationError from "../../middleware/applicationError.middleware.js";
import { UserModel } from "./user.schema.js";
import mongoose from "mongoose";

export default class UserRepository {
  async signUp(name, emailId, password, gender, avatar) {
    try {
      const newUser = UserModel({
        name,
        emailId,
        password,
        gender,
        avatar,
        follower: []
      });
      const result = await newUser.save();
      return result;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }
  async signIn(emailId, password) {
    try {
      return await UserModel.findOne({ emailId, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError(err.message, 500);
    }
  }
  async findByEmail(emailId) {
    try {
      return await UserModel.findOne({ emailId });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while checking email in database", 500);
    }
  }
}
