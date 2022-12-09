const mongoose = require("mongoose")
const { Schema } = mongoose

const reqString = {
  type: String,
  required: true,
}

const levelSetupSchema = new Schema({
  guildId: reqString,
  text: {
    type: String,
    default: "GG $PING! You Advanced To **Level $LEVEL**!",
  },
  sendType: {
    type: String,
    enum: ["onthespot", "dm", "channel", "quiet"],
  },
  channelId: {
    type: String,
    default: undefined,
  },
})

module.exports = mongoose.model("level-setup", levelSetupSchema)
