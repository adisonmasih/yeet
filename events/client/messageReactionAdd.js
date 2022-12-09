const { handleReaction } = require("../../features/guild/rr")

module.exports = {
  name: "messageReactionAdd",
  async execute(reaction, user, client) {
    console.log("messageReactionAdd")
    // console.log(reaction);
    await handleReaction({ reaction, user, adding: true })
  },
}
