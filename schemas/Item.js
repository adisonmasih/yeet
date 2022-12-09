const mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
  name: String,
  icon: String,
  slug: String,
  type: String,
  description: String,
  buyPrice: Number,
  sellPrice: Number,
  rarity: String,
  effects: [String],
  usable: Boolean,
  keywords: [String],
  category: {
    type: String,
    default: "item",
  },
  fromGuild: {
    type: String,
    default: "YEET",
  },
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

module.exports = mongoose.model("Item", itemSchema);
