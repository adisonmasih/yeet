const { SelectMenuBuilder, Role, SnowflakeUtil } = require("discord.js");

module.exports = {
  data: {
    name: "yeet-role-menu",
  },
  async execute(interaction, client) {
    console.log("from yeet role menu");
    const { customId, values, member } = interaction;

    const { guild } = member;
    const { roles } = guild;

    const component = interaction.component;
    const removed = component.options.filter((option) => {
      return !values.includes(option.value);
    });

    try {
      //   for (const id of removed) {
      //     console.log(id);
      //     console.log("----");
      //     console.log(removed);
      //     let role = await roles.cache.find((r) => r.id === id);
      //     console.log(role);
      //     member.roles.remove(role);
      //   }

      console.log(removed);
      console.log("----");
      console.log(values);
      console.log("----");

      removed.forEach(async (item, index) => {
        let id = item.value;
        console.log("START REMOVING");
        let role = await roles.cache.find((r) => r.id === id);
        console.log(role);
        if (role) {
          member.roles.remove(role);
        }
        console.log("END REMOVING");
      });

      values.forEach(async (item, index) => {
        let id = item;
        let role = await roles.cache.find((r) => r.id === id);
        if (role) member.roles.add(role);
      });

      //   for (const id of values) {
      //     console.log(id);
      //     console.log("----");
      //     console.log(values);
      //     let role = await roles.cache.find((r) => r.id === id);
      //     member.roles.add(role);
      //   }
    } catch (e) {
      console.log(e);
    }

    interaction.reply({
      content: "Roles Updated :white_check_mark:",
      ephemeral: true,
    });
  },
};
