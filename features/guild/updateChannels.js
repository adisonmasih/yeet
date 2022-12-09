const MemberCountChannel = require("../../schemas/MemberCountChannel");

module.exports = {
  name: "updateChannels",
  async execute(client) {
    const updateChannels = async (client) => {
      console.log("FROM updateCountChannels");
      const channels = await MemberCountChannel.find();
      for (const result of channels) {
        const channelId = result.channelId;
        const guildId = result.guildId;
        const guild = client.guilds.cache.get(guildId);
        if (!guild) continue;
        const type = result.countType;
        const text = result.content;
        let channel;
        try {
          channel = await guild.channels.fetch(channelId, {
            force: true,
          });
        } catch (e) {
          await MemberCountChannel.deleteOne({
            channelId: channelId,
            guildId: guildId,
          });
          console.log(
            `Deleted channel ${channelId} FROM Guild ${guildId} in the database`
          );
        }

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
          type == "goal"
            ? text
            : text.replaceAll("$COUNT", newChannelCountValue);

        await channel.edit({
          name: newChannelName,
        });
      }

      console.log("FINISHED updateCountChannels");
      setTimeout(() => {
        updateChannels(client);
      }, 1000 * 60 * 11);
    };

    updateChannels(client);
  },
};
