const responses = [
    "Woohoo! That's fantastic!",
    "Amazing news! I'm thrilled!",
    "Oh wow! That's so exciting!",
    "Yay! I'm jumping with joy!",
    "Incredible! I'm ecstatic!",
    "That's awesome! I'm so pumped!",
    "Oh my gosh! I'm beyond excited!",
    "Whoa! That's absolutely thrilling!",
    "Fantastic! I'm over the moon!",
    "Oh yeah! Let's celebrate!",
    "Woo! I'm super excited for you!",
    "That's incredible! I can't contain my excitement!",
    "Yahoo! Let's do a happy dance!",
    "Oh yeah! That's pure excitement right there!",
    "Wow! I'm buzzing with excitement!",
    "That's amazing! I'm grinning ear to ear!",
    "Brilliant! I'm bursting with excitement!",
    "Oh my goodness! I'm so pumped up!",
    "Hooray! That's totally awesome!",
    "Epic news! I'm bouncing off the walls!",
    "Yes! That's absolutely thrilling!",
    "Unbelievable! I'm so hyped!",
    "Oh yes! I'm absolutely thrilled!",
    "That's incredible! Let's shout it from the rooftops!",
    "Yes, yes, yes! I'm thrilled beyond words!",
    "Woo-hoo! That's pure excitement right there!",
    "Oh yeah! I'm ready to party!",
    "Amazing! I'm brimming with excitement!",
    "Oh my goodness! I'm so excited I could burst!",
    "Yippee! I'm overjoyed for you!",
    "That's fantastic news! I'm jumping for joy!",
    "Oh wow! I'm so excited I can hardly contain myself!",
    "That's awesome! I'm absolutely thrilled!",
    "Oh yeah! I'm buzzing with excitement!",
    "Yes! Yes! Yes! I'm ecstatic!",
    "Oh my gosh! I'm so happy for you!",
    "Incredible! I'm beaming with excitement!",
    "That's fantastic! I'm so pumped!",
    "Oh wow! That's absolutely amazing!",
    "Yay! I'm doing a happy dance!",
    "Woohoo! That's cause for celebration!",
    "Oh yeah! I'm bursting with excitement!",
    "Amazing! I'm grinning from ear to ear!",
    "Yes! That's pure excitement right there!",
    "Oh my goodness! I'm so thrilled!",
    "Brilliant! I'm jumping for joy!",
    "Hooray! That's absolutely fantastic!",
    "Epic! I'm positively buzzing with excitement!",
    "Oh yes! I'm absolutely over the moon!",
    "That's incredible! Let's shout it from the rooftops!",
    "Yes, yes, yes! I'm beyond excited!",
    "Woo-hoo! That's amazing news!"
];

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("excited")
        .setDescription("Use this command to show you're excited!")
    ,
    testOnly: false,
    async execute(interaction, client) {
        // respond to it as a message

        const response = responses[Math.floor(Math.random() * responses.length)];

        interaction.reply(response)

    },
};
