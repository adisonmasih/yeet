const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const Economy = require("../../core/helpers/economy");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Fishing In The New Pond, You Are a Big Donk"),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.user;
    let item = client.custom.economy.items.get("fishing_rod");

    if (
      await Economy.handleNeedsItem({
        itemSlug: item.slug,
        user,
        client,
        interaction,
      })
    ) {
      return;
    }

    let userData = await User.findOne({ discordId: user.id });
    if (userData.cooldowns.fish > Date.now() && !client.isSpecial(user.id)) {
      let embed = new EmbedBuilder()
        .setTitle("Slow Down Mate..")
        .setDescription(
          `⏳ The Fish Are Having Sex Right Now.. Children Will Be Ready In: \`${prettyMs(
            userData.cooldowns.fish - Date.now(),
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
    const { inventory } = userData;

    let luck = (Math.floor(Math.random() * 100) / 100) * 100;
    let rewardAbles = client.custom.economy.items.filter((item) =>
      item?.keywords?.includes("fishItem")
    );

    let commons = rewardAbles.filter((item) => item.rarity == "common");
    let rares = rewardAbles.filter((item) => item.rarity == "rare");
    let epics = rewardAbles.filter((item) => item.rarity == "epic");
    let legendaries = rewardAbles.filter((item) => item.rarity == "legendary");

    let rewards = [];

    if (luck < 10) {
      rewards = [];
    } else if (luck > 10 && luck < 40) {
      let prize = {
        data: commons.random(),
        qty: Math.floor(Math.random() * 5 * Math.random()) + 1,
      };

      let secondLuck = (Math.floor(Math.random() * 100) / 100) * 100;
      if (secondLuck > 90) {
        let secondPrize = {
          data: [commons, rares, epics, legendaries][
            Math.floor(Math.random() * 4)
          ].random(),
          qty: 1,
        };
        if (secondPrize && secondPrize.data && prize && prize.data) {
          if (secondPrize.data.slug == prize.data.slug) {
            if (prize && prize.data) prize.qty++;
          } else {
            rewards.push(secondPrize);
          }
        }
      }
      if (prize && prize.data) rewards.push(prize);
    } else if (luck >= 40 && luck < 70) {
      let prize = {
        data: rares.random(),
        qty: Math.floor(Math.random() * 2 * Math.random()) + 1,
      };

      let secondLuck = (Math.floor(Math.random() * 100) / 100) * 100;
      if (secondLuck > 80) {
        let secondPrize = {
          data: [commons, rares, epics, legendaries][
            Math.floor(Math.random() * 4)
          ].random(),
          qty: 1,
        };
        if (secondPrize && secondPrize.data && prize && prize.data) {
          if (secondPrize.data.slug == prize.data.slug) {
            if (prize && prize.data) prize.qty++;
          } else {
            rewards.push(secondPrize);
          }
        }
      }
      if (prize && prize.data) rewards.push(prize);
    } else if (luck >= 70 && luck < 100) {
      let prize = {
        data: epics.random(),
        qty: Math.floor(Math.random() * 1 * Math.random()) + 1,
      };

      let secondLuck = (Math.floor(Math.random() * 100) / 100) * 100;
      if (secondLuck > 80) {
        let secondPrize = {
          data: [commons, rares, epics, legendaries][
            Math.floor(Math.random() * 4)
          ].random(),
          qty: 1,
        };
        if (secondPrize && secondPrize.data && prize && prize.data) {
          if (secondPrize.data.slug == prize.data.slug) {
            if (prize && prize.data) prize.qty++;
          } else {
            rewards.push(secondPrize);
          }
        }
      }
      if (prize && prize.data) rewards.push(prize);
    } else if (luck <= 100) {
      let prize = {
        data: legendaries.random(),
        qty: Math.floor(Math.random() * 1 * Math.random()) + 1,
      };

      let secondLuck = (Math.floor(Math.random() * 100) / 100) * 100;
      if (secondLuck > 80) {
        let secondPrize = {
          data: [commons, rares, epics, legendaries][
            Math.floor(Math.random() * 4)
          ].random(),
          qty: 1,
        };
        if (secondPrize && secondPrize.data && prize && prize.data) {
          if (secondPrize.data.slug == prize.data.slug) {
            if (prize && prize.data) prize.qty++;
          } else {
            rewards.push(secondPrize);
          }
        }
      }
      if (prize && prize.data) rewards.push(prize);
    }

    let noneMessages = [
      "Aww Shit.. Fish Hated Your Perfume!",
      "Bruh.. Fish Got Away! You Are So Lazy..",
      `"You Just Suck..." - **The Fish**`,
      "Nah Man.. Your Luck Sucks",
      "Fish Ain't Easy To Catch.. It Requires Skill...",
      "This Ain't Your Job, Go Suck Cocks..",
    ];

    let desc = "";

    if (rewards.length == 0) {
      desc = noneMessages[Math.floor(Math.random() * noneMessages.length)];
    } else {
      let rewardRealMessages = [];
      for (const reward of rewards) {
        if (reward && reward.data) {
          rewardRealMessages.push(
            `**<:${reward.data.slug}:${reward.data.icon}> ${reward.qty}x ${reward.data.name}** (${reward.data.rarity})`
          );
        }
      }
      desc = `You Got:\n${rewardRealMessages.join("\n")}`;
    }

    let embed = new EmbedBuilder()
      .setDescription(desc)
      .setColor(client.colors.GREY)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });

    for (const reward of rewards) {
      let { slug } = reward.data;
      let { qty } = reward;

      if (inventory[slug]) {
        inventory[slug] += qty;
      } else {
        inventory[slug] = qty;
      }
    }

    await User.updateOne(
      {
        discordId: userData.discordId,
      },
      {
        inventory: {
          ...inventory,
        },
      }
    );

    userData.cooldowns.fish = Date.now() + 1000 * 35;
    userData.save();
  },
};
