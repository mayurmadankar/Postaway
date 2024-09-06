//import the modules
import "./env.js";
import express from "express";
import bodyParser from "body-parser";

//import the routes files here
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import postRouter from "./src/features/post/post.router.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";

import { errorHandlerMiddleware } from "./src/middleware/applicationError.middleware.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

//create the server using express server
const server = express();

//to convert the request body from JSON format into the javascript object
server.use(bodyParser.json());
server.use(express.json());

//to encode the url parse data by client
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Welcome to the PostAway API");
});

//logger middleware to check the status of client
server.use(loggerMiddleware);

//UserRouter
server.use("/api/users", userRouter);

// PostRouter;
server.use("/api/posts", jwtAuth, postRouter);

// comment routes
server.use("/api/comments", jwtAuth, commentRouter);

//Like Routes
server.use("/api/likes", jwtAuth, likeRouter);

//otp Routes
server.use("/api/otp", otpRouter);

server.use(errorHandlerMiddleware);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is Listening at Port Number ${port}`);
  connectUsingMongoose();
});

//export the server for server.js
export default server;
