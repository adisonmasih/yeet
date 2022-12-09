const mongoose = require("mongoose")
const { Schema } = mongoose

const reqString = {
  type: String,
  required: true,
}

const roleMessageSchema = new Schema({
  guildId: reqString,
  channelId: reqString,
  messageId: reqString,
  roles: [{ emoji: reqString, role: reqString, label: reqString }],
  requiredRole: {
    type: String,
    default: "none",
  },
  color: {
    type: String,
    default: "Yellow",
  },
  title: {
    type: String,
    default: "React For Roles:",
  },
  extra: {
    type: String,
    default: "",
  },
  format: {
    type: String,
    default: "$EMOJI => $ROLE",
  },
})

module.exports = mongoose.model("RoleMessage", roleMessageSchema)
