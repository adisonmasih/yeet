const { EmbedBuilder } = require("discord.js");
const getHackDetails = require("../../core/hack");

module.exports = {
  name: "hack",
  aliases: ["hk"],
  description: "Huck Someone For Real..",
  args: {
    required: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    console.log(`final args from command: `, args);
    let user = mentions.first();
    let reply = await message.reply(`Hacking **${user.username}**...`);
    let {
      gmailAddress,
      gmailPassword,
      mostVisitedSite,
      onlyFans,
      orientation,
      stalkCount,
    } = getHackDetails(user.username);

    setTimeout(async () => {
      await reply.edit(`DDOSing **${user.username}**\'s Device`);

      setTimeout(async () => {
        await reply.edit(`Hacked Google Account...`);
        setTimeout(async () => {
          let gEmbed = new EmbedBuilder()
            .setTitle(`${user.username}'s Google Account`)
            .setColor(client.colors.GREEN)
            .addFields([
              {
                name: "Gmail Address",
                value: gmailAddress,
              },
              {
                name: "Gmail Password",
                value: gmailPassword,
              },
            ]);
          await reply.edit({
            embeds: [gEmbed],
          });
          setTimeout(async () => {
            await reply.edit({
              embeds: [],
              content: "Getting Most Visited Site...",
            });
            setTimeout(async () => {
              await reply.edit(
                `**${user.username}'s** Most Visited Site Is ${mostVisitedSite}`
              );
              setTimeout(async () => {
                await reply.edit(
                  `Finding **${user.username}'s** OnlyFans Account...`
                );
                setTimeout(async () => {
                  await reply.edit(
                    `**${user.username}'s** OnlyFans Username Is **@${onlyFans}**`
                  );
                  setTimeout(async () => {
                    await reply.edit(
                      `Analyzing **${user.username}'s** Sexual Orientation Using _Totally_ Real A.I...`
                    );
                    setTimeout(async () => {
                      await reply.edit(
                        `**${user.username}** Is **${orientation}** 🏳️‍🌈 🏳️‍🌈`
                      );
                      setTimeout(async () => {
                        await reply.edit(
                          "Finding Total Amount Of Stalked Girls..."
                        );
                        setTimeout(async () => {
                          await reply.edit(
                            `**${user.username}** Has Stalked **_${stalkCount}_** Girls In The Previous Month`
                          );
                          setTimeout(async () => {
                            await reply.edit(
                              `Trying To Delete **${user.username}'s** Discord Account...`
                            );
                            setTimeout(async () => {
                              await reply.edit(
                                `Discord Account Deletion Failed!\n**Reason:** A.I Took Pity On ${user.username} Because Of His Singleness & Virginity`
                              );
                              setTimeout(async () => {
                                await reply.edit(
                                  `Would You Like To Continue The Hack? type **YES** To Continue | else type **NO** To End The Hack...`
                                );
                                setTimeout(async () => {
                                  await reply.edit(
                                    `No One Gives A Fuck About Your Choice... I'm Ending The Hack...`
                                  );
                                  setTimeout(async () => {
                                    await reply.edit(
                                      `The Hack Was **_Gracefully_** Completed.`
                                    );
                                  }, 4000);
                                }, 4000);
                              }, 4000);
                            }, 3000);
                          }, 2000);
                        }, 2000);
                      }, 2000);
                    }, 2000);
                  }, 2500);
                }, 2000);
              }, 2000);
            }, 2000);
          }, 3500);
        }, 2000);
      }, 1200);
    }, 1300);
  },
};
