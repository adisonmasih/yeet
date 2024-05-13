const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const Economy = require("../../core/helpers/economy");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Do Ro-berry")
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("The Unique 6-Digit User Address")
        .setRequired(true)
        .setMinLength(6)
        .setMaxLength(6)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.user;

    let userData = await User.findOne({ discordId: user.id });
    if (!userData.cooldowns?.rob) {
      userData.cooldowns.rob = Date.now();
    }
    if (userData.cooldowns.rob > Date.now() && !client.isSpecial(user.id)) {
      let embed = new EmbedBuilder()
        .setTitle("TF STOP")
        .setDescription(
          `⏳ Try Again In \`${prettyMs(userData.cooldowns.rob - Date.now(), {
            verbose: true,
            secondsDecimalDigits: 0,
          })}\``
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

    let address = interaction.options.getString("address");

    if (address == userData?.address) {
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setDescription(`Hey.. Seems Pretty Dumb To Steal From Yourself tf...`);

      return interaction.reply({
        embeds: [embed],
      });
    }

    let target = await User.findOne({
      address,
    });

    if (!target) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.colors.PRIMARY)
            .setDescription(
              `Nahh Man! A User With **${address}** Doesn't Exist!`
            ),
        ],
      });
    }

    const { inventory } = userData;
    const { inventory: targetInventory } = target;

    let luck = (Math.floor(Math.random() * 100) / 100) * 100;
    let die = false;
    let percent = 0;
    let message = "WTF";
    let lock = {
      type: "",
      isBroken: false,
    };
    let isLucky = false;

    if (inventory.hasOwnProperty("rob_book")) {
      luck *= 1.5;
      isLucky = true;
    }

    if (targetInventory.hasOwnProperty("padlock")) {
      if (Math.random() < 0.8 - (isLucky ? 0.6 : 0)) {
        luck = 0;
        lock.type = "padlock";
      } else {
        luck = (Math.floor(Math.random() * 100) / 100) * 100 + 11;
        delete targetInventory["padlock"];
        lock.type = "padlock";
        lock.isBroken = true;
      }
    } else if (targetInventory.hasOwnProperty("electric_lock")) {
      if (Math.random() < 0.95 - (isLucky ? 0.5 : 0)) {
        luck = 0;
        lock.type = "electric_lock";
      } else {
        luck = (Math.floor(Math.random() * 100) / 100) * 100 + 11;
        delete targetInventory["electric_lock"];
        lock.type = "electric_lock";
        lock.isBroken = true;
      }
    }

    console.log("LUCK: ", luck);
    if (luck < 30) {
      percent = 0;
      message = "Aww Shit Man.. You Couldn't Get Anything!";
    } else if (luck > 30 && luck < 50) {
      percent = 10;
      message = "You Stole A Small Portion **$**";
    } else if (luck > 50 && luck < 70) {
      percent = 30;
      message = "You Stole A Decent Amount!! **$**";
    } else if (luck > 70 && luck < 90) {
      percent = 50;
      message = "You Fuckin' Stole Half Their Balance!!! **$**";
    } else if (luck > 90) {
      percent = 100;
      message =
        "Oh My Yeet!!! You Just Stole All Of Their Balance!!! WTF **$**";
    }

    if (message == "WTF") {
      percent = 0;
      message = "Aww Shit Man.. You Couldn't Get Anything!";
    }

    let amount = Math.floor((percent / 100) * target.balance);

    message = message.replaceAll(`$`, `${amount} ${client.emoji.yeetCoin}!`);

    const padlock = client.custom.economy.items.get("padlock");
    const electricLock = client.custom.economy.items.get("electric_lock");

    if (lock.isBroken == true) {
      let brokenLock = lock.type == "padlock" ? padlock : electricLock;
      message += `\nYou Also Broke Their **<:${brokenLock.slug}:${brokenLock.icon}> ${brokenLock.name}**`;
    }

    let shock = 0;

    if (lock.type == "electric_lock" && !lock.isBroken) {
      shock = Math.floor((10 / 100) * userData.balance);
      message += `\nSince They Had An **<:${electricLock.slug}:${electricLock.icon}> ${electricLock.name}**\nYou Lost **${shock} ${client.emoji.yeetCoin}!**`;
    }

    let embed = new EmbedBuilder()
      .setDescription(message)
      .setColor(client.colors.GREY)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });

    await User.updateOne(
      {
        address,
      },
      {
        balance: target.balance - amount + shock,
        inventory: { ...targetInventory },
      }
    );

    await User.updateOne(
      {
        discordId: userData.discordId,
      },
      {
        balance: userData.balance + amount - shock,
      }
    );

    userData.cooldowns.rob = Date.now() + 1000 * 35;
    userData.save();

    let descX;

    if (amount > 0) {
      descX = `Holy Dayum! You Were Robbed By **${user.tag}** (${userData.address}).\nThey Stole \`${amount}\`\ From You!`;
      if (lock.isBroken) {
        let brokenLock = lock.type == "padlock" ? padlock : electricLock;
        descX += `\nThey Also Broke Your **<:${brokenLock.slug}:${brokenLock.icon}> ${brokenLock.name}!**\nConsider Buying A New One Using \`/buy\` now!`;
      }
    } else if (percent < 50) {
      descX = `Holy Dayum! **${user.tag}** (${userData.address}) Tried To Rob You! But Luckily You Were Saved`;
      let brokenLock = lock.type == "padlock" ? padlock : electricLock;
      descX += ` By Your **<:${brokenLock.slug}:${brokenLock.icon}> ${brokenLock.name}!**\n`;
      if (lock.type == "electric_lock" && !lock.isBroken) {
        descX += ` & You Gained **${shock}** ${client.emoji.yeetCoin} from them!`;
      }
    }

    let embedX = new EmbedBuilder()
      .setDescription(descX)
      .setColor(client.colors.GREY)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      });

    let targetD = await client.users.fetch(target.discordId);
    targetD.send({
      embeds: [embedX],
    });
    console.log(lock);
  },
};
