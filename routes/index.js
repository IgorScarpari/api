const { requireAuthMiddleware } = require("../auth");

module.exports = function (app) {
  app.use("/books", require("./book"));
  app.use("/users", require("./user"));
  app.use("/reserves", require("./reserve"));
};
