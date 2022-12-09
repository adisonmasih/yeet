const mongoose = require("mongoose");

let optionSchema = new mongoose.Schema({
  guildId: String,
  name: String,
  value: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Option", optionSchema);
