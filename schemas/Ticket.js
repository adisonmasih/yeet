const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const ticketSchema = new Schema({
  guildId: reqString,
  members: [reqString],
  channelId: reqString,
  ticketId: reqString,
  closed: {
    type: Boolean,
    default: false,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  type: String,
  claimed: Boolean,
  claimedBy: String,
});

module.exports = mongoose.model("ticket", ticketSchema);
