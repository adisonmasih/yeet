const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const Invites = new Schema({
  guildId: reqString,
  inviterId: reqString,
  userId: reqString,
});

module.exports = mongoose.model("invites", Invites);
