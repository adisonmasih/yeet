const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

const schema = new Schema(
  {
    userId: String,
    guildId: String,
    staffId: String,
    reason: String,
    expires: Date,
    type: {
      type: String,
      required: true,
      enum: ["ban", "mute"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model["Punishment"] || mongoose.model("Punishment", schema);
