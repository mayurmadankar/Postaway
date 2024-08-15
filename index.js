//import the modules
import express from "express";
import bodyParser from "body-parser";

//import the routes files here

//create the server using express server
const server = express();

//to convert the request body from JSON format into the javascript object
server.use(bodyParser.json());
//to encode the url parse data by client
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Welcome to the PostAway API");
});

//export the server for server.js
export default server;
