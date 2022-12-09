const { EmbedBuilder } = require("discord.js");
const User = require("../schemas/User");

class DieAble {
  constructor({ user, model, client }) {
    this.user = user;
    this.model = model;
    this.client = client;
  }
  async die(reason) {
    let model = this.model;
    let user = this.user;
    let client = this.client;
    const { inventory } = model;
    let embed;
    let lifeSaver = this.client.custom.economy.items.get("life_saver");
    if (!inventory.hasOwnProperty("life_saver")) {
      await User.updateOne(
        {
          discordId: model.discordId,
        },
        {
          inventory: {},
          balance: 0,
        }
      );

      embed = new EmbedBuilder()
        .setTitle("Oh No! You Died!")
        .setDescription(
          `Ahh Shit Man! You Died Because Of ${reason}. Maybe Buy A Lifesaver Next Time? Since You Are Dead, Your Inventory Has Been Truncated & Balance Has Been Zeroed. To Recover From This Loss, You Might Wanna Use The \`/vote\` Command To Get **50,000x** ${this.client.emoji.yeetCoin} & Some Other Cool Items!`
        )
        .setColor("Red")
        .setThumbnail(this.client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
          name: this.client.user.username,
          iconURL: this.client.user.displayAvatarURL(),
        });
    } else {
      inventory["life_saver"]--;
      if (inventory["life_saver"] == 0) {
        delete inventory["life_saver"];
      }

      await User.updateOne(
        {
          discordId: model.discordId,
        },
        {
          inventory: {
            ...inventory,
          },
        }
      );

      embed = new EmbedBuilder()
        .setTitle("Holy God! You ALMOST DIED!")
        .setDescription(
          `Oh My! You Were Just About To Die\nBut Your <:${lifeSaver.slug}:${
            lifeSaver.icon
          }> **${
            lifeSaver.name
          }** Saved You!\nThe Life Saver Has Been Used Up And You Are Now Left With:\n**${
            inventory[lifeSaver.slug] ?? "0"
          }x <:${lifeSaver.slug}:${lifeSaver.icon}> ${
            lifeSaver.name
          }!**\nYou Might Wanna Get Some, Use \`/buy\` for That!`
        )
        .setColor("Red")
        .setThumbnail(this.client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
          name: this.client.user.username,
          iconURL: this.client.user.displayAvatarURL(),
        });
    }

    await this.user.send({
      embeds: [embed],
    });
  }
}

module.exports = {
  DieAble,
};
