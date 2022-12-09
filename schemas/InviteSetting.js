const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const InviteSetting = new Schema({
  guildId: reqString,
  channelId: reqString,
  threshold: {
    type: Number,
    default: 3,
    min: 1,
    max: 300,
  },
  template: reqString,
});

module.exports = mongoose.model("invite-tracker-setting", InviteSetting);
