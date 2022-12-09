const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const welcomeSchema = new Schema({
  _id: reqString,
  channelId: reqString,
  message: reqString,
});

module.exports = mongoose.model("Welcome", welcomeSchema);
