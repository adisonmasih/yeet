const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
let files = [];
const commandsFolder = fs.readdirSync("./commands/");
for (const folder of commandsFolder) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    files.push({ name: file, folder });
  }
}
const commands = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("You Lost Babe? Huh?"),
  testOnly: true,
  async execute(interaction, client) {
    await interaction.deferReply();
    let count = 0;
    for (const xd of files) {
      let file = xd.name;
      let folder = xd.folder;
      if (file.name !== "help") {
        const cmd = require("./../" + folder + "/" + file);
        // console.log(`${file}`);
        count++;
        if (cmd.data.options.length >= 3) {
          cmd.data.options.forEach((option) => {
            if (!option.type) {
              count++;
              // the subcommand option type is 'undefined', so if the type is undefined, its a subcommand.
              commands.push({
                name: `/${cmd.data.name} ${option.name}`,
                value: `👉 ${option.description}`,
              });
            }
          });
        } else {
          let desc = cmd.data.description ?? "No Description Found!";
          commands.push({
            name: `/${cmd.data.name}`,
            value: `👉 ` + (desc ?? "No Description Found"),
          });
        }
      }
    }
    let embeds = [];
    let pages = {};
    for (let i = 0; i < commands.length; i++) {
      if (i % 10 == 0) {
        embeds.push(
          new EmbedBuilder()
            .setTitle("Yeet Slash Commands")
            .setDescription(
              `These Are Only Slash Commands. To View Legacy Commands, Use \`${process.env.PREFIX} help\`\nTotal Available Commands: \`${count}\``
            )
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.displayAvatarURL(),
            })
            .setColor(client.colors.GREY)
            .addFields(commands.slice(i, i + 10))
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

    const id = interaction.user.id;
    pages[id] = pages[id] || 0;
    const embed = embeds[pages[id]];

    let collector;

    const filter = (i) => i.user.id === id;
    const time = 1000 * 60 * 5;

    await interaction.editReply({
      embeds: [embed],
      components: [getRow(id)],
    });

    collector = interaction.channel.createMessageComponentCollector({
      filter,
      time,
    });
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

      interaction.editReply({
        embeds: [embeds[pages[id]]],
        components: [getRow(id)],
      });
    });
  },
};
