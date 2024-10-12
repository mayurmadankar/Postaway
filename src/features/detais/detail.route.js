import express from "express";
import DetailController from "./detail.controller.js";

const detailRouter = express.Router();

detailRouter.get("/details", (req, res, next) => {
  DetailController.detail(req, res, next);
});
export default detailRouter;
