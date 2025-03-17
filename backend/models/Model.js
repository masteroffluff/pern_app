const db = require("../utils/db");


class Model {
    constructor() {
        this.at = db.atomicTrasaction();
      }
      async commit_and_release() {
        await this.at.commit();
        this.at.releaseClient();
      }
}

module.exports = Model;