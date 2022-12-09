const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const expirableSchema = new Schema({
  discordId: reqString,
  itemSlug: reqString,
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: Date,
    required: true,
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("expirable", expirableSchema);
