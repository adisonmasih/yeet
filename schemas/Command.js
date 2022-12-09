const mongoose = require("mongoose");

let commandSchema = new mongoose.Schema({
  name: "string",
  description: "string",
  usage: "string",
  aliases: [String],
  category: "string",
});

module.exports = mongoose.model("Command", commandSchema);
