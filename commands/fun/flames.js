const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function calculateFLAMES(name1, name2) {
    // Convert names to lowercase and remove spaces
    name1 = name1.toLowerCase().replace(/\s/g, '');
    name2 = name2.toLowerCase().replace(/\s/g, '');

    // Create a copy of name2
    let name2Copy = name2;

    // Iterate through name1
    for (let i = 0; i < name1.length; i++) {
        const char = name1[i];
        // If the character exists in name2, remove it from both names
        if (name2Copy.includes(char)) {
            name2Copy = name2Copy.replace(char, '');
            name1 = name1.replace(char, '');
        }
    }

    // Combine the remaining characters
    const remainingChars = name1 + name2Copy;

    // Count the number of remaining characters
    const count = remainingChars.length;

    // Define FLAMES array
    const flames = ["Friendship", "Love", "Affection", "Marriage", "Enemies", "Siblings"];

    // Return relationship status based on the count
    return flames[count % 6];
}

function getCommentForRelationship (relationship) {
    // an array of comments for each relationship which contains an array, make sure they are quirky and kinda 18+

    const comments = {
        "Friendship": ["You two are besties!", "You two are inseparable!", "You two are the ultimate duo!"],
        "Love": ["You two are a match made in heaven!", "You two are the perfect couple!", "You two are so in love!"],
        "Affection": ["You two are so sweet!", "You two are so caring!", "You two are so affectionate!"],
        "Marriage": ["You two are meant to be!", "You two are the perfect pair!", "You two are so married!"],
        "Enemies": ["You two are always fighting!", "You two are always at odds!", "You two are always at war!"],
        "Siblings": ["You two are like siblings!", "You two are like family!", "You two are like brother and sister!"],
    };

    return comments[relationship].random();

    
}


module.exports = {
  data: new SlashCommandBuilder()
    .setName("flames")
    .setDescription("Calculate Flames between two people")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who's our target").setRequired(true)
    ).addUserOption(
        (option) => option.setName("user2").setDescription("Who's the second target").setRequired(false)
    ),

  testOnly: false,

  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const user2 = interaction.options.getUser("user2") || interaction.user;

    const flames = calculateFLAMES(user.displayName, user2.displayName);
    const comment = getCommentForRelationship(flames);

  const desc = `**${user.displayName}** and **${user2.displayName}** are ${flames}!\n${comment}`;

    let embed = new EmbedBuilder()
        .setTitle("FLAMES")
        .setDescription(desc)
        .setColor(client.colors.GREEN)
        .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
        })
        .setFooter({
            text: `Requested By: ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
        });

    interaction.reply({
        embeds: [embed],
    });
  },
};
