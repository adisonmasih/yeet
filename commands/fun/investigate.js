const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")

const getHouse = () => {
  const places = [
    "Near Nude Beach",
    "Near Prostitution Centre",
    "Near LGBTQ Support Centre",
    "Near MILF Centre",
  ]

  const houseNo = ["6969", "69", "420", "69420"]

  const unavailables = ["Gate", "Window", "Walls", "Paint", "Tiles"]

  const items = [
    "A Condom",
    "A Pair Of Panties",
    "Something Soft...",
    "A LGBTQ Flag",
    "A Pile Of Poop",
    "A Pregnancy Test",
    "Some Blood (From Some Strange Body Part)",
    "A White Sticky Liquid",
  ]

  const computerItems = [
    "Some White Sticky Liquid",
    "A Keyboard (Mostly Typed On With One Hand)",
    "2 Mice 😳",
  ]

  const photos = [
    "Nude Ariana Grande",
    "Mia Khalifa",
    "Sunny Leone",
    "Madison Ivy",
    "Johnny Sins",
  ]

  // nothing in kitchen

  const bedroom = [
    "No Beds",
    "Completely White Bedsheets",
    "Non-Unlockable Doors",
    "Pregnancy Test Kits",
  ]

  const animals = ["Dogs", "Cats", "Zebras", "Monkeys", "Hippos", "Pigs"]

  const doorScraping = [
    "I'm A Man With No Heart",
    "Masturbate Today Like There's No Tomorrow",
    "You Came Here Slim, Will Go Fat",
    "I Like Cheese 🧀",
  ]

  return {
    place: places.random(),
    houseNo: houseNo.random(),
    animals: animals.random(),
    doorScraping: doorScraping.random(),
    unavailable: unavailables.random(),
    item: items.random(),
    computerItem: computerItems.random(),
    photo: photos.random(),
    bedroomItem: bedroom.random(),
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("investigate")
    .setDescription("Investigate Someone's House And Find Lewd Thingies...")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Your Freakin' Target")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("target") || interaction.user
    let {
      place,
      houseNo,
      animals,
      doorScraping,
      unavailable,
      computerItem,
      item,
      photo,
      bedroomItem,
    } = getHouse()

    let embed = new EmbedBuilder()
      .setDescription(`Finding ${user}'s Location...`)
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    interaction
      .reply({
        embeds: [embed],
      })
      .then(() => {
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            resolve(
              await interaction.editReply({
                embeds: [
                  embed.setDescription(`Nearest Landmark: **${place}**`),
                ],
              })
            )
          }, 3500)
        }).then(() => {
          new Promise((resolve, reject) => {
            setTimeout(async () => {
              await interaction.editReply({
                embeds: [embed.setDescription(`House No: **#${houseNo}**`)],
              })
              resolve(true)
            }, 3500)
          }).then(() => {
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await interaction.editReply({
                  embeds: [
                    embed.setDescription(
                      `Okay.. I'm Not Sure Why But **2 ${animals}** Are Having **Sex** Right Before The Door`
                    ),
                  ],
                })
                resolve(true)
              }, 3500)
            }).then(() => {
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  await interaction.editReply({
                    embeds: [
                      embed.setDescription(
                        `The Door Has On It Engraved:\n**"${doorScraping}"**`
                      ),
                    ],
                  })
                  resolve(true)
                }, 3500)
              }).then(() => {
                new Promise((resolve, reject) => {
                  setTimeout(async () => {
                    await interaction.editReply({
                      embeds: [
                        embed.setDescription(
                          `Dayum. This House Got No **${unavailable}**`
                        ),
                      ],
                    })
                    resolve(true)
                  }, 3500)
                }).then(() => {
                  new Promise((resolve, reject) => {
                    setTimeout(async () => {
                      await interaction.editReply({
                        embeds: [
                          embed.setDescription(
                            `Broooo... I Just Found **${item}** Lying On The Floor...`
                          ),
                        ],
                      })
                      resolve(true)
                    }, 3500)
                  }).then(() => {
                    new Promise((resolve, reject) => {
                      setTimeout(async () => {
                        await interaction.editReply({
                          embeds: [
                            embed.setDescription(
                              `Damn I Also Just Found A **${getHouse().item}**`
                            ),
                          ],
                        })
                        resolve(true)
                      }, 3500)
                    }).then(() => {
                      new Promise((resolve, reject) => {
                        setTimeout(async () => {
                          await interaction.editReply({
                            embeds: [
                              embed.setDescription(
                                `Now Lets Go To The Computer Room...`
                              ),
                            ],
                          })
                          resolve(true)
                        }, 3500)
                      }).then(() => {
                        new Promise((resolve, reject) => {
                          setTimeout(async () => {
                            await interaction.editReply({
                              embeds: [
                                embed.setDescription(
                                  `I Found **${computerItem}** Near The Computer`
                                ),
                              ],
                            })
                            resolve(true)
                          }, 2000)
                        }).then(() => {
                          new Promise((resolve, reject) => {
                            setTimeout(async () => {
                              await interaction.editReply({
                                embeds: [
                                  embed.setDescription(
                                    `WTF!!! Why Is There A Photo Of **${photo}** On The Wall?????`
                                  ),
                                ],
                              })
                              resolve(true)
                            }, 3500)
                          }).then(() => {
                            new Promise((resolve, reject) => {
                              setTimeout(async () => {
                                await interaction.editReply({
                                  embeds: [
                                    embed.setDescription(
                                      `Also Why Are There **${bedroomItem}** In The **Bedroom**? _Strange..._`
                                    ),
                                  ],
                                })
                                resolve(true)
                              }, 3500)
                            }).then(() => {
                              new Promise((resolve, reject) => {
                                setTimeout(async () => {
                                  await interaction.editReply({
                                    embeds: [
                                      embed.setDescription(
                                        `Damn Poor Kid. Nothing In The Kitchen...`
                                      ),
                                    ],
                                  })
                                  resolve(true)
                                }, 3500)
                              }).then(() => {
                                new Promise((resolve, reject) => {
                                  setTimeout(async () => {
                                    await interaction.editReply({
                                      embeds: [
                                        embed.setDescription(
                                          `Bruh This Place Smells Of Dirty Lizard Ass Poop..\nI Can't Stay Here Any Longer! Bye MF!`
                                        ),
                                      ],
                                    })
                                    resolve(true)
                                  }, 3500)
                                }).then(() => {
                                  new Promise((resolve, reject) => {
                                    setTimeout(async () => {
                                      await interaction.editReply({
                                        embeds: [
                                          embed.setDescription(
                                            `**_Investigation Completed ✅_**`
                                          ),
                                        ],
                                      })
                                      resolve(true)
                                    }, 3500)
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
  },
}
