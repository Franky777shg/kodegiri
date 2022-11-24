const util = require("util");
const db = require("../db_config");

module.exports = {
  asyncQuery: util.promisify(db.execute).bind(db),
};
