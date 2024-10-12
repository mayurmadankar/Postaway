import DetailRepository from "./detail.repository.js";

export default class DetailController {
  constructor() {
    this.repository = new DetailRepository();
  }
}
