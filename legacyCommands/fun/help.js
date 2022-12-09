const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "You Lost Babe? Huh?",
  aliases: ["hlp"],
  args: {
    optional: [
      {
        name: "command",
        type: "text",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let commandName = args[0] || "all";
    if (commandName != "all") {
      let command = client.legacyCommandArray.filter(
        (command) =>
          command.name == commandName || command.aliases?.includes(commandName)
      )[0];
      if (!command) {
        let embed = new EmbedBuilder()
          .setTitle("Invalid Command!")
          .setDescription(`Command **${commandName}** Not Found!!`)
          .setColor(client.colors.RED);
        message.reply({
          embeds: [embed],
        });
        return;
      } else {
        let fields = [];
        let argsString = " ";

        command?.args?.required?.forEach((item) => {
          argsString += `<${item.name}> `;
        });

        command?.args?.optional?.forEach((item) => {
          argsString += `[${item.name}] `;
        });

        let embed = new EmbedBuilder()
          .setTitle(`${process.env.PREFIX} ${command.name} ${argsString}`)
          .setDescription(
            `${command.description ?? ""}
            ${command.aliases?.length > 0 ? "**Aliases: **" : ""} ${
              command.aliases?.join(", ") ?? ""
            }
          `
          )
          .setColor(client.colors.PRIMARY);

        message.reply({
          embeds: [embed],
        });
        return;
      }
    } else {
      let embeds = [];
      let pages = {};
      let fields = [];
      client.legacyCommandArray.forEach((command, key) => {
        let argsString = " ";

        command?.args?.required?.forEach((item) => {
          argsString += `<${item.name}> `;
        });

        command?.args?.optional?.forEach((item) => {
          argsString += `[${item.name}] `;
        });

        fields.push({
          name: `${process.env.PREFIX} ${command.name} ${argsString}`,
          value: command.description ?? "",
        });
      });

      for (let i = 0; i < fields.length; i++) {
        if (i % 10 == 0) {
          embeds.push(
            new EmbedBuilder()
              .setTitle("Yeet Commands")
              .setDescription(
                `The Prefix is \`yeet\`\nArguments Enwrapped In **<>** Are Required\nArguments Enwrapped In **[]** Are Optional`
              )
              .setColor(client.colors.PRIMARY)
              .addFields(fields.slice(i, i + 10))
          );
        }
      }

      const getRow = (id) => {
        const row = new ActionRowBuilder();
        row.addComponents(
          new ButtonBuilder()
            .setCustomId("prev_embed")
            .setEmoji("<:previous:863198512824188929>")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(pages[id] === 0),
          new ButtonBuilder()
            .setCustomId("next_embed")
            .setEmoji("<:next:863198512915939338>")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(pages[id] === embeds.length - 1)
        );
        return row;
      };

      const id = message.author.id;
      pages[id] = pages[id] || 0;
      const embed = embeds[pages[id]];

      let reply;
      let collector;

      const filter = (i) => i.user.id === id;
      const time = 1000 * 60 * 5;

      reply = await message.reply({
        embeds: [embed],
        components: [getRow(id)],
      });

      collector = reply.createMessageComponentCollector({ filter, time });
      collector.on("collect", (btnInt) => {
        if (!btnInt) {
          return;
        }

        btnInt.deferUpdate();

        if (
          btnInt.customId !== "next_embed" &&
          btnInt.customId !== "prev_embed"
        ) {
          return;
        }

        if (btnInt.customId === "prev_embed" && pages[id] > 0) {
          pages[id]--;
        } else if (
          btnInt.customId === "next_embed" &&
          pages[id] < embeds.length - 1
        ) {
          pages[id]++;
        }

        reply.edit({
          embeds: [embeds[pages[id]]],
          components: [getRow(id)],
        });
      });
    }
  },
};
