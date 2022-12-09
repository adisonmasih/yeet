const Punishment = require("../../schemas/Punishment");

module.exports = {
  name: "checkMutes",
  async execute(client) {
    const check = async () => {
      const query = {
        expires: {
          $lt: new Date(),
        },
      };

      const results = await Punishment.find(query);

      for (const result of results) {
        const { guildId, userId, type } = result;
        const guild = await client.guilds.fetch(guildId);
        if (!guild) {
          console.log(`Guild "${guildId}" No Uses YEET! Curse Them!`);
          continue;
        }

        if (type == "ban") {
          guild.members.unban(userId, "Ban Expired!");
        } else if (type == "mute") {
          const mutedRole = await guild.roles.cache.find(
            (role) => role.name === "Muted"
          );
          if (!mutedRole) {
            console.log(`Guild ${guildId} Doesn't Have A "Muted" Role!`);
            continue;
          }

          const member = await guild.members.cache.get(userId);
          if (!member) {
            continue;
          }
          member.roles.remove(mutedRole);
        }
      }

      await Punishment.deleteMany(query);

      setTimeout(check, 60 * 1000);
    };
    check();
  },
};
