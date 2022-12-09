const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const MemberCountChannel = new Schema({
  _id: mongoose.Types.ObjectId,
  guildId: reqString,
  channelId: reqString,
  content: reqString,
  countType: {
    type: String,
    enum: ["members", "bots", "total", "goal"],
  },
});

module.exports = mongoose.model("MemberCountChannel", MemberCountChannel);
