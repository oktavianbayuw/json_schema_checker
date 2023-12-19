const BaseRepository = require("./baseRepository");

class ResultsRepository extends BaseRepository {
  constructor() {
    super("results");
  }
}

module.exports = new ResultsRepository();
