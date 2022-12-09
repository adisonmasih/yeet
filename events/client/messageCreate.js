const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    require("../../manuals/guild/levels")(message, client);
    // console.log("-------------- STARTING SHARD ------------");
    // // console.log(message.guild.shard);
    // console.log("-------------- ENDING SHARD ------------");

    const prefix = client.config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const messageArray = message.content.split(/\s+/g);
    messageArray.shift();
    const commandName = messageArray[0].toLowerCase();

    const { legacyCommands } = client;
    const command = legacyCommands.get(commandName);
    if (!command) return;

    let newEmbed = new EmbedBuilder()
      .setTitle("No More Legacy!")
      .setDescription(
        `**Yeet** Has Switched To The Discord Native Slash Commands System. We Know That This Maybe  A Turn Off For Most Of You, But Believe Us! Its For Your Own Good! We Know That No Everybody Favours Slash Commands And TBH, Legacy Commands Were Way More Better Than Slash Commands. But Do Not Lose Hope! Our Fellows Discord Are Constantly Improving The Way Slash Commands Work & We Hope You Be A Part Of it. All Of Yeet's Commands Are Now Accessable Via The \`/\` Commands. `
      )
      .setColor(client.colors.GREY)
      .setImage(client.user.displayAvatarURL());

    let newRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Read The Blog Post")
        .setURL(
          "https://discord.com/blog/welcome-to-the-new-era-of-discord-apps?ref=yeet"
        )
        .setStyle(ButtonStyle.Link)
    );

    // return message.reply({
    //   embeds: [newEmbed],
    //   components: [newRow],
    // });

    let argsSeparator = command?.args?.separator || /\s+/g;
    let args = message.content.slice(prefix.length).split(argsSeparator);

    console.log(args);

    args.forEach((arg, index) => {
      if (arg.trim() == command.name) {
        args.splice(index, 1);
      }

      command.aliases.forEach((alias, _) => {
        if (arg.trim() == alias) {
          args.splice(index, 1);
        }
      });
    });

    args.forEach((arg, index) => {
      if (arg == "") {
        args.splice(index, 1);
      }
    });

    console.log(args);

    // if (args.length < (command?.args?.required || []).length) {
    //   let missingArgs = [];

    //   for (let i = 0; i < command?.args?.required?.length; i++) {
    //     missingArgs.push(`<${command?.args?.required[i].name}>`);
    //   }

    //   let embed = new EmbedBuilder()
    //     .setTitle("Invalid Syntax!")
    //     .setDescription(
    //       `Correct Syntax: **yeet ${commandName} ${missingArgs.join(
    //         argsSeparator
    //       )}**`
    //     )
    //     .setColor(client.colors.RED)
    //     .setAuthor({
    //       name: message.member.displayName,
    //       iconURL: message.member.displayAvatarURL(),
    //     });

    //   return message.reply({
    //     embeds: [embed],
    //   });
    // }

    let requiresMentions = false;
    let requiredMentionsCount = 0;

    command?.args?.required?.forEach((arg) => {
      if (arg.type == "user") {
        requiresMentions = true;
        requiredMentionsCount++;
      }
    });

    let mentions = [];
    console.log("MENTIONS START::");
    console.log(message.mentions.users);
    console.log("MENTIONS END::");
    if (message?.mentions?.users.size > 0) {
      mentions = message?.mentions?.users || [];
    }

    console.log(
      `requires mentions: ${requiresMentions} | required mentions: ${requiredMentionsCount} | mentions: ${mentions.size}`
    );

    if (requiresMentions && requiredMentionsCount > mentions.length) {
      let missingArgs = [];

      for (let i = 0; i < command?.args?.required?.length; i++) {
        missingArgs.push(`<${command?.args?.required[i].name}>`);
      }
      let embed = new EmbedBuilder()
        .setTitle("Invalid Syntax!")
        .setDescription(
          `Correct Syntax: **yeet ${commandName} ${missingArgs.join(", ")}**`
        )
        .setColor(client.colors.RED)
        .setAuthor({
          name: message.member.displayName,
          iconURL: message.member.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    args.forEach((item, index) => {
      if (item.startsWith("<@") && item.endsWith(">")) {
        args.splice(index, 1);
      }

      if (command.aliases?.includes(item)) {
        args.splice(index, 1);
      }

      if (command.name == item) {
        args.splice(index, 1);
      }

      if (typeof args[index] == "string") {
        args[index] = args[index]
          .toString()
          .replaceAll(command.name, "")
          .trim();
      }

      console.log(args[index]);

      command.aliases?.forEach((alias, _) => {
        if (typeof args[index] == "string") {
          args[index] = args[index].toString().replaceAll(alias, "").trim();
        }
        console.log(args[index]);
      });
    });

    if (
      args.length < (command?.args?.required || []).length &&
      command?.args?.required[0]?.type != "user"
    ) {
      let missingArgs = [];

      for (let i = 0; i < command?.args?.required?.length; i++) {
        missingArgs.push(`<${command?.args?.required[i].name}>`);
      }

      let embed = new EmbedBuilder()
        .setTitle("Invalid Syntax!")
        .setDescription(
          `Correct Syntax: **yeet ${commandName} ${missingArgs.join(", ")}**`
        )
        .setColor(client.colors.RED)
        .setAuthor({
          name: message.member.displayName,
          iconURL: message.member.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    console.log(`ARGS LENGTH:: ${args.length}`);
    console.log(`REQUIRED ARGS LENGTH:: ${command?.args?.required?.length}`);

    try {
      await command.execute(message, args, client, mentions);
      // message.channel
      //   .createInvite()
      //   .then((invite) =>
      //     console.log(
      //       `Created an invite with a code of https://discord.gg/${invite.code}`
      //     )
      //   )
      //   .catch(console.error);
    } catch (e) {
      console.error(e);
    }
  },
};
