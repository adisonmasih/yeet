const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const JoinToCreate = new Schema({
  _id: mongoose.Types.ObjectId,
  guildId: reqString,
  channelId: reqString,
  role: {
    type: String,
    default: "none",
  },
});

module.exports = mongoose.model("join-to-create", JoinToCreate);
