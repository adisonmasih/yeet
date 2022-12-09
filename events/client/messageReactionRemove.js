const { handleReaction } = require("../../features/guild/rr")

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user, client) {
    console.log("messageReactionRemove")
    // console.log(reaction);
    await handleReaction({ reaction, user, adding: false })
  },
}
