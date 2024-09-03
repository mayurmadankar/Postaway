import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class userController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    try {
      const { name, emailId, password, gender } = req.body;
      const avatar = req.file.filename;
      const hashPassword = await bcrypt.hash(password, 12);
      const userCreated = await this.userRepository.signUp(
        name,
        emailId,
        hashPassword,
        gender,
        avatar
      );
      if (userCreated._id) {
        res.status(201).send({
          success: true,
          message: "User has been registered successfully!",
          data: userCreated
        });
      } else {
        res.status(400).send({
          success: false,
          message: "User has not been registered!",
          data: []
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async signIn(req, res) {
    const { emailId, password } = req.body;
    //1.check email exist or not
    const user = await this.userRepository.findByEmail(emailId);
    if (!user) {
      res.status(400).send({ success: false, message: "Email not exits!" });
    }
    // 2. Compare  password with hashed password.
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const userResult = await this.userRepository.signIn(
        emailId,
        user.password
      );
      const token = jwt.sign(
        { userId: userResult._id, emailId: userResult.emailId },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h"
        }
      );
      res.status(200).send({
        success: true,
        message: "User has been logged In!",
        data: token
      });
    } else {
      res.status(400).send({ success: false, message: "Invalid Crediential" });
    }
  }
  catch(error) {
    next(error);
  }
}
