import express from "express";
import DetailController from "./detail.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const detailRouter = express.Router();
const detailController = new DetailController();

detailRouter.get("/mine", jwtAuth, (req, res, next) => {
  detailController.detail(req, res, next);
});
export default detailRouter;
