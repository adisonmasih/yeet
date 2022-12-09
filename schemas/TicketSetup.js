const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const ticketSetupSchema = new Schema({
  guildId: reqString,
  channelId: reqString,
  category: reqString,
  transcriptsChannelId: reqString,
  handlers: reqString,
  buttons: [
    {
      emoji: String,
      label: String,
    },
  ],
  description: reqString,
  everyoneId: reqString,
  type: String,
});

module.exports = mongoose.model("ticket-setup", ticketSetupSchema);
