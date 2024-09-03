
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    maxLength: [25, "Name can't be greater than 25 charcaters"]
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\../, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  avatar: {
    type: String
  },
  friendId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Friend'
  },
  follower:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
  ],
  otp:{
     type: String
  },
  otpExpires: { 
    type: Date 
  },
  otpVerify: { 
    type: String 
  }
})

export const UserModel = mongoose.model('User',userSchema);