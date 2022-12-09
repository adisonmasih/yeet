const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const getHackDetails = require('../../core/hack')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hack')
        .setDescription('Huck Someone For Real..')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        await interaction.reply(`Hacking **${user.username}**..`);

        console.log("Hey working!")

        let { gmailAddress, gmailPassword, mostVisitedSite, onlyFans, orientation, stalkCount } = getHackDetails(user.username);



        setTimeout(async () => {
            await interaction.editReply(`DDOSing **${user.username}**\'s Device`)

            setTimeout(async () => {
                await interaction.editReply(`Hacked Google Account...`)
                setTimeout(async () => {
                    let gEmbed = new EmbedBuilder().setTitle(`${user.username}'s Google Account`).setColor(client.colors.GREEN).addFields([
                        {
                            name: 'Gmail Address',
                            value: gmailAddress,
                        },
                        {
                            name: 'Gmail Password',
                            value: gmailPassword
                        }
                    ]);
                    await interaction.editReply({
                        embeds: [gEmbed]
                    });
                    setTimeout(async () => {
                        await interaction.editReply({
                            embeds: [],
                            content: 'Getting Most Visited Site...'
                        })
                        setTimeout(async () => {
                            await interaction.editReply(`**${user.username}'s** Most Visited Site Is ${mostVisitedSite}`)
                            setTimeout(async () => {
                                await interaction.editReply(`Finding **${user.username}'s** OnlyFans Account...`)
                                setTimeout(async () => {
                                    await interaction.editReply(`**${user.username}'s** OnlyFans Username Is **@${onlyFans}**`)
                                    setTimeout(async () => {
                                        await interaction.editReply(`Analyzing **${user.username}'s** Sexual Orientation Using _Totally_ Real A.I...`);
                                        setTimeout(async () => {
                                            await interaction.editReply(`**${user.username}** Is **${orientation}** 🏳️‍🌈 🏳️‍🌈`)
                                            setTimeout(async () => {
                                                await interaction.editReply('Finding Total Amount Of Stalked Girls...')
                                                setTimeout(async () => {
                                                    await interaction.editReply(`**${user.username}** Has Stalked **_${stalkCount}_** Girls In The Previous Month`)
                                                    setTimeout(async () => {
                                                        await interaction.editReply(`Trying To Delete **${user.username}'s** Discord Account...`)
                                                        setTimeout(async () => {
                                                            await interaction.editReply(`Discord Account Deletion Failed!\n**Reason:** A.I Took Pity On ${user.username} Because Of His Singleness & Virginity`)
                                                            setTimeout(async () => {
                                                                await interaction.editReply(`Would You Like To Continue The Hack? type **YES** To Continue | else type **NO** To End The Hack...`)
                                                                setTimeout(async () => {
                                                                    await interaction.editReply(`No One Gives A Fuck About Your Choice... I'm Ending The Hack...`)
                                                                    setTimeout(async () => {
                                                                        await interaction.editReply(`The Hack Was **_Gracefully_** Completed.`)
                                                                    }, 4000)
                                                                }, 4000)
                                                            }, 4000)
                                                        }, 3000)
                                                    }, 2000)
                                                }, 2000)
                                            }, 2000)
                                        }, 2000)
                                    }, 2500)
                                }, 2000)
                            }, 2000)
                        }, 2000)
                    }, 3500)
                }, 2000)
            }, 1200)

        }, 1300)


    }
}