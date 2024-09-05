import ApplicationError from "../../middleware/applicationError.middleware.js";
import { UserModel } from "./user.schema.js";
import mongoose from "mongoose";
import { generateOTP } from "../../services/otp.js";
import { sendOTPMail } from "../../services/mailer.js";

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
      throw new ApplicationError("Error while signIn", 500);
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
  async getAllUser() {
    try {
      return await UserModel.find().select("-password");
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Error while getting all user details", 500);
    }
  }
  async getUserDetail(id, userId) {
    try {
      if (id === userId) {
        return await UserModel.findById(id).select("-password");
      } else {
        throw new ApplicationError("Authorized user not found", 403);
      }
    } catch (error) {
      throw new ApplicationError(error.message || "Database query failed", 500);
    }
  }
  async updateUser(id, userId, name, gender, avatar) {
    try {
      if (id == userId) {
        const user = await UserModel.findById(id).select("-email -password");
        if (user) {
          user.name = name;
          user.gender = gender;
          user.avatar = avatar;
          return await user.save();
        } else {
          throw new ApplicationError("User not exists in database!", 500);
        }
      } else {
        throw new ApplicationError("Unauthorised user found!", 500);
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async resetPasswordUser(id, password) {
    try {
      let user = await UserModel.findById({ _id: id }).select(
        "-email -password"
      );
      if (user.otpVerify == "verified") {
        user.otp = undefined;
        user.otpExpires = undefined;
        user.otpVerify = undefined;
        user.password = password;
        return user.save();
      } else {
        throw new ApplicationError("Otp not verified!", 400);
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message, error.code);
    }
  }
  async sendOtpUser(email) {
    try {
      const user = await UserModel.findOne({ emailId: email });
      if (!user) {
        throw new Error("User not exists in database!");
      }

      const otp = await generateOTP();
      user.otp = otp;
      user.otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
      await user.save();

      const sendOtp = await sendOTPMail(
        email,
        "Otp For Password Reset",
        `Here below is the Otp send. Your Otp is ${otp}`
      );
      return user.otp;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async verifyOtpUser(id, otp) {
    try {
      const user = await UserModel.findOne({
        _id: id,
        otp,
        otpExpires: { $gt: Date.now() }
      }).select("-email -password");
      if (!user) {
        throw new ApplicationError("Invalid OTP or OTP expired", 400);
      }
      user.otpVerify = "verified";
      return await user.save();
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
