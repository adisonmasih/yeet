const MemberCountChannel = require("../../schemas/MemberCountChannel");

module.exports = async (member, client) => {
  console.log("FROM updateCountChannels");
  try {
    const channels = await MemberCountChannel.find();
    for (const result of channels) {
      const channelId = result.channelId;
      const guildId = result.guildId;
      const type = result.countType;
      const text = result.content;
      const guild = client?.guilds?.cache?.get(guildId);
      const channel = await guild?.channels?.fetch(channelId, {
        force: true,
      });
      if (!channel) continue;

      let total = await guild.members.fetch({
        force: true,
      });
      let bots = total.filter((m) => m.user.bot).size;
      let users = total.filter((m) => !m.user.bot).size;
      console.log(`users: ${users} bots: ${bots}`);
      let newChannelCountValue = 0;
      switch (type) {
        case "members":
          newChannelCountValue = users;
          break;
        case "bots":
          newChannelCountValue = bots;
          break;
        case "total":
          newChannelCountValue = users + bots;
          break;
        default:
          break;
      }
      let newChannelName =
        type == "goal" ? text : text.replaceAll("$COUNT", newChannelCountValue);

      await channel.edit({
        name: newChannelName,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
