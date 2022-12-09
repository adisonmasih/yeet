const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  SelectMenuComponent,
  ActionRowBuilder,
  PermissionsBitField,
} = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");
const RoleMessage = require("../../schemas/RoleMessage");
const { fetchCache, addToCache } = require("../../features/guild/rr");

module.exports = {
  name: "addrole",
  aliases: ["adr"],
  description: "Adds A New Role To The Auto Role Message",
  async execute(message, args, client, mentions) {
    if (
      !message.member
        .permissionsIn(message.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Do Not Have Permission To Run This Command")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    if (
      !message.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ I Do Not Have Permission To Manage Roles")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    let roleMentions = message.mentions.roles;

    if (roleMentions.size === 0) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ Please Mention A Valid Role")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    let role = message.mentions.roles.first();
    if (!role) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ Please Mention A Valid Role")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    let argsStr = args
      .join(" ")
      .replaceAll(/<@&\d*>/gm, "")
      .replaceAll(" = ", "=")
      .replaceAll("= ", "=")
      .split("=");

    argsStr.forEach((arg, index) => {
      if (arg.trim() == "") {
        argsStr.splice(index, 1);
      }
    });
    console.log(argsStr);

    if (argsStr.length < 2) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Invalid Arguments")
        .setDescription(
          "Correct Usage: `yeet addrole <@role> <displayName> = <emoji>`"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    let roleDisplayName = argsStr[0];
    let roleEmoji = argsStr[1];

    const { guild } = message;

    const result = await RoleMessage.findOne({
      guildId: guild.id,
    });

    if (!result) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ No Auto Role Message Found")
        .setDescription(
          "Please Use The `send` command to set up the auto role message"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    const targetChannel = await guild.channels.cache.get(result.channelId);
    if (!targetChannel) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Invalid Channel")
        .setDescription(
          "The Channel Used to Setup The Auto Role Message No Longer Exists. Please Use The `send` command to set up the auto role message again"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    const targetMessage = await targetChannel.messages.fetch(result.messageId, {
      cache: true,
      force: true,
    });

    if (!targetMessage) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Invalid Message")
        .setDescription(
          "The Message Used to Setup The Auto Role No Longer Exists. Please Use The `send` command to set up the auto role message again"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    if (roleEmoji.includes(":")) {
      const emojiName = emoji.split(":")[1];
      roleEmoji = await guild.emojis.cache.find(
        (emoji) => emoji.name === emojiName
      );
    }

    const [fetchedMessage] = fetchCache(guild.id);

    console.log(`fetchedMessage: ${fetchedMessage}`);
    if (!fetchedMessage) {
      return message.reply({
        content: "Wohoo.. Calm Down.. I Just Woke Up!!",
      });
    }

    await addToCache(client, guild.id, fetchedMessage, roleEmoji, role.id);

    const newLine = `${roleEmoji} = ${roleDisplayName}`;
    let { content } = fetchedMessage;

    console.log(fetchedMessage);

    if (content.includes(roleEmoji)) {
      const split = content.split("\n");
      for (let i = 0; i < split.length; i++) {
        if (split[i].includes(roleEmoji)) {
          split[i] = newLine;
        }
      }

      content = split.join("\n");
    } else {
      content += `\n${newLine}`;
    }

    fetchedMessage.edit({ content });

    const obj = {
      guildId: guild.id,
      channelId: fetchedMessage.channel.id,
      messageId: fetchedMessage.id,
    };

    await RoleMessage.findOneAndUpdate(
      obj,
      {
        ...obj,
        $addToSet: {
          roles: {
            emoji: roleEmoji,
            role: role.id,
          },
        },
      },
      { upsert: true }
    );
    const fChannel = await guild.channels.fetch(fetchedMessage.channel.id);
    const fMessage = await fChannel.messages.fetch(fetchedMessage.id);

    await fetchedMessage.react(roleEmoji);

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Role Added")
      .setDescription("The Role Has Been Added To The Auto Role Message")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return message.reply({
      embeds: [embed],
    });
  },
};
