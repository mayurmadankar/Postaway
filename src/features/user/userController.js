import userModel from "./userModel.js";
import jwt from "jsonwebtoken";

//create the instance of the class
let usermodel = new userModel();

export default class userController {
  signupUser(req, res) {
    const { name, email, password } = req.body;
    const newUser = usermodel.signupUser(name, email, password);
    if (newUser) {
      res
        .status(201)
        .json({ message: "User register Successfully", user: newUser });
    } else {
      res.status(400).json({ message: "User already Register" });
    }
  }
  signinUser(req, res) {
    const { email, password } = req.body;
    const user = usermodel.signinUser(email, password);
    if (user) {
      const token = jwt.sign({ emailID: email }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });
      return res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
}
