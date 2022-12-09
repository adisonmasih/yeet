const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
        // interaction.channel
        //   .createInvite()
        //   .then((invite) =>
        //     console.log(
        //       `Created an invite with a code of https://discord.gg/${invite.code}`
        //     )
        //   )
        //   .catch(console.error);
      } catch (e) {
        console.log(e);
        // await interaction.reply({
        //     content: 'An error occured while executing this command.',
        // })
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;

      if (customId.startsWith("ticket:")) {
        let category = customId.split(":")[1];
        let button = buttons.get("ticket");
        await button.execute({
          interaction,
          client,
          category,
        });
        return;
      }

      const button = buttons.get(customId);

      if (!button) {
        console.log(`Button ${customId} not found.`);
        return;
      }

      await button.execute({ interaction, client });
    } else if (interaction.isSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const selectMenu = selectMenus.get(customId);

      if (!selectMenu) {
        console.log(`Select Menu ${customId} not found.`);
        return;
      }

      try {
        await selectMenu.execute(interaction, client);
      } catch (e) {
        console.log(e);
      }
    } else if (
      interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
      const { commands } = client;
      const { commandName } = interaction;

      const command = commands.get(commandName);

      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
