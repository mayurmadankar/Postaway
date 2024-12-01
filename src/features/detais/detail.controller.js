import DetailRepository from "./detail.repository.js";

export default class DetailController {
  constructor() {
    this.repository = new DetailRepository();
  }

  async detail(req, res, next) {
    try {
      const userId = req.userId; // Pass userId via query string, e.g., /details?userId=123
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const details = await this.repository.getDetailsByUser(userId);

      if (!details) {
        return res
          .status(404)
          .json({ message: "No details found for this user." });
      }

      res.status(200).send(details);
    } catch (error) {
      next(error); // Pass error to error-handling middleware
    }
  }
}
