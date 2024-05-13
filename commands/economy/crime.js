const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
const { crimes, Crime } = require("../../core/crime");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Commit A Prob-Fake Crime To Get Some Yeet Coins!"),
  testOnly: true,
  async execute(interaction, client) {
    const { user } = interaction;
    const { id: discordId } = user;
    let userData =
      (await User.findOne({ discordId })) ||
      (await new User({ discordId }).save());

    const { inventory } = userData;
    const criminalMind = client.custom.economy.items.get("criminal_mind");

    if (!userData.cooldowns?.crime) {
      userData.cooldowns.crime = Date.now();
    }
    if (userData.cooldowns?.crime > Date.now() && !client.isSpecial(user.id)) {
      let embed = new EmbedBuilder()
        .setTitle("Slow Down Mate..")
        .setDescription(
          `⏳ Stop Committing Too Much Crime.. Try Again In: \`${prettyMs(
            userData.cooldowns.crime - Date.now(),
            { verbose: true, secondsDecimalDigits: 0 }
          )}\``
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setColor(client.colors.RED);
      return interaction.reply({
        embeds: [embed],
      });
    }

    if (!inventory.hasOwnProperty("criminal_mind")) {
      let embed = new EmbedBuilder()
        .setTitle("Crime Tutorial")
        .setDescription(
          `Using This Command You Can Commit (FAKE) Crimes That May Result In Profit Of Yeet Coins & Items or Death. Use This Command Wisely & Timely, Commiting Crimes Very Often Makes You More Prone To Death. Since You Require A **<:${criminalMind.slug}:${criminalMind.icon}> ${criminalMind.name}** For This, We Have Automatically Pumped It Into Your Inventory!`
        )
        .setColor(client.colors.GREY)
        .setFooter({
          text: "Use The Command After Reading This Tutorial!",
        })
        .setTimestamp(Date.now())
        .setThumbnail(client.emojiURL(criminalMind.icon))
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL(),
        });

      inventory[criminalMind.slug] = 1;

      await interaction.reply({
        embeds: [embed],
      });

      return await User.updateOne(
        {
          discordId,
        },
        {
          inventory: {
            ...inventory,
          },
        }
      );
    }

    let crimes = Crime.getCrimes(3);

    let embed = new EmbedBuilder()
      .setDescription(
        `**What Evil Plans Do You Have Today?**\n_Select A Crime Below To Commit It:_`
      )
      .setColor(client.colors.GREY);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(crimes[0].name)
        .setCustomId(crimes[0].id)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(crimes[1].name)
        .setCustomId(crimes[1].id)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(crimes[2].name)
        .setCustomId(crimes[2].id)
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });

    const filter = (i) => i.user.id === user.id;
    const time = 15 * 1000;
    let commited = false;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time,
    });

    let crimeIds = [];
    crimes.map((c) => crimeIds.push(c.id));

    let used = false;

    collector.on("collect", async (i) => {
      if (!i) return;

      const { customId } = i;

      if (!crimeIds.includes(customId)) return;

      used = true;
      let chosenCrime = crimes.filter((c) => c.id == customId)[0];
      console.log(chosenCrime);

      await collector.stop();

      let result = chosenCrime.commit();

      let disabledRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(crimes[0].name)
          .setCustomId(crimes[0].id)
          .setStyle(
            customId == crimes[0].id
              ? ButtonStyle.Primary
              : ButtonStyle.Secondary
          )
          .setDisabled(true),
        new ButtonBuilder()
          .setLabel(crimes[1].name)
          .setCustomId(crimes[1].id)
          .setStyle(
            customId == crimes[1].id
              ? ButtonStyle.Primary
              : ButtonStyle.Secondary
          )
          .setDisabled(true),
        new ButtonBuilder()
          .setLabel(crimes[2].name)
          .setCustomId(crimes[2].id)
          .setStyle(
            customId == crimes[2].id
              ? ButtonStyle.Primary
              : ButtonStyle.Secondary
          )
          .setDisabled(true)
      );

      if (result.type == "reward") {
        try {
          await i.update({
            embeds: [
              embed
                .setDescription(result.message)
                .setTitle(`${user.username} committed ${chosenCrime.name}`),
            ],
            components: [disabledRow],
          });
        } catch (e) {
          await i.editReply({
            embeds: [
              embed
                .setDescription(result.message)
                .setTitle(`${user.username} committed ${chosenCrime.name}`),
            ],
            components: [disabledRow],
          });
        }

        await User.updateOne(
          {
            discordId,
          },
          {
            balance: userData.balance + result.rewardAmount,
          }
        );
      } else {
        try {
          await i.update({
            embeds: [
              embed
                .setDescription(result.message)
                .setFooter({
                  text: "imagine being so bad",
                })
                .setTitle(`${user.username} committed ${chosenCrime.name}`),
            ],
            components: [disabledRow],
          });
        } catch (e) {
          await i.editReply({
            embeds: [
              embed
                .setDescription(result.message)
                .setFooter({
                  text: "imagine being so bad",
                })
                .setTitle(`${user.username} committed ${chosenCrime.name}`),
            ],
            components: [disabledRow],
          });
        }
      }
    });

    collector.on("end", async (i) => {
      console.log("Collector Ended!", used);
      const { customId } = i;
      if (!used) {
        await interaction.editReply({
          embeds: [embed.setDescription(Crime.getBackOut())],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setLabel(crimes[0].name)
                .setCustomId(crimes[0].id)
                .setStyle(
                  customId == crimes[0].id
                    ? ButtonStyle.Primary
                    : ButtonStyle.Secondary
                )
                .setDisabled(true),
              new ButtonBuilder()
                .setLabel(crimes[1].name)
                .setCustomId(crimes[1].id)
                .setStyle(
                  customId == crimes[1].id
                    ? ButtonStyle.Primary
                    : ButtonStyle.Secondary
                )
                .setDisabled(true),
              new ButtonBuilder()
                .setLabel(crimes[2].name)
                .setCustomId(crimes[2].id)
                .setStyle(
                  customId == crimes[2].id
                    ? ButtonStyle.Primary
                    : ButtonStyle.Secondary
                )
                .setDisabled(true)
            ),
          ],
        });
      }
    });

    userData.cooldowns.crime = Date.now() + 1000 * 35;
    userData.save();
  },
};
