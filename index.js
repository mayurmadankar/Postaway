//import the modules
import express from "express";
import bodyParser from "body-parser";

//import the routes files here
import userRouter from "./src/features/user/userRoutes.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import PostRouter from "./src/features/post/postRouter.js";

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

//UserRouter
server.use("/api/user", userRouter);

//PostRouter
server.use("/api/post", jwtAuth, PostRouter);

//export the server for server.js
export default server;
