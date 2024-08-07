const { SlashCommandBuilder } = require('discord.js')

const responses = [
    "You have a great sense of style!",
    "You're a great listener.",
    "You light up the room with your smile!",
    "You have a good head on your shoulders.",
    "You're an amazing friend.",
    "You're a strong and resilient person.",
    "You have a heart of gold.",
    "You're incredibly thoughtful and caring.",
    "You have an infectious laugh.",
    "You're a fantastic cook!",
    "You have a way with words.",
    "You're a true inspiration.",
    "You're a natural leader.",
    "You always know how to make others feel special.",
    "You have a wonderful sense of humor.",
    "You have a kind and compassionate heart.",
    "You're an absolute gem.",
    "You bring out the best in others.",
    "You have a unique perspective that is valued.",
    "You're as radiant as a sunbeam.",
    "You have a beautiful soul.",
    "You're a genuine and authentic person.",
    "You have a calming presence.",
    "You're incredibly talented and creative.",
    "You have a heartwarming smile.",
    "You're a true joy to be around.",
    "You have a way of making people feel comfortable.",
    "You radiate positivity and warmth.",
    "You're a fantastic problem solver.",
    "You have a great sense of humor.",
    "You make the world a better place.",
    "You're a true ray of sunshine.",
    "You have a gift for making others feel special.",
    "You're a true blessing in my life.",
    "You have a heart that shines brightly.",
    "You're an amazing and loyal friend.",
    "You bring happiness wherever you go.",
    "You have a fantastic sense of humor.",
    "You're a powerhouse of positivity.",
    "You have a heart that's pure gold.",
    "You're one of a kind and truly special.",
    "You're the light in many people's lives.",
    "You're a breath of fresh air.",
    "You have an incredible knack for making people feel valued.",
    "You have a beautiful heart and spirit.",
    "You're a rare gem of a person.",
    "You have a positive impact on everyone you meet.",
    "You're like a burst of sunshine on a cloudy day.",
    "You're a remarkable individual.",
    "You have a sharp mind and a caring heart.",
    "You're an absolute delight to be around.",
    "You have a wonderful way with words.",
    "You light up the room with your positivity.",
    "You're an incredible listener and friend.",
    "You have a heart as big as the ocean.",
    "You're a true beacon of joy.",
    "You have a way of making people feel at ease.",
    "You're brimming with creativity and talent.",
    "You're a true source of inspiration.",
    "You have a heart filled with kindness and compassion.",
    "You're a force of nature in the best possible way.",
    "You have a heart of gold and a smile to match.",
    "You're a truly wonderful person.",
    "You have a way of lifting others up with your presence.",
    "You're a shining example of goodness and grace.",
    "You possess an inner beauty that shines through.",
    "You're a genuine and caring soul.",
    "You have a way of making every day brighter.",
    "You're an extraordinary individual.",
    "You have the ability to make others feel truly valued.",
    "You're a source of light and joy for many.",
    "You have a heart that's full of love and compassion.",
    "You're a treasure in the lives of those around you.",
    "You have a sparkle in your eyes that lights up the room.",
    "You're a pillar of strength and support for others.",
    "You're a true gift to the world.",
    "You have a way of bringing out the best in everyone.",
    "You're a genuine and authentic soul.",
    "You have a heart that overflows with kindness.",
    "You're a true beacon of positivity and joy.",
    "You're a source of comfort and warmth for many.",
    "You have a heart that's as beautiful as a rainbow.",
    "You're an absolute delight to know.",
    "You have a way of making the ordinary extraordinary.",
    "You're a master at brightening someone's day.",
    "You have a spirit that can't be dimmed.",
    "You're a true example of goodness and grace.",
    "You have a heart that's as warm as a summer day.",
    "You're a blessing in the lives of those around you.",
    "You have a positive impact on everyone you meet.",
    "You're a source of light and joy for many.",
    "You have a heart that's full of love and compassion.",
    "You're a treasure in the lives of those around you.",
    "You have a sparkle in your eyes that lights up the room.",
    "You're a pillar of strength and support for others.",
    "You're a true gift to the world.",
    "You have a way of bringing out the best in everyone.",
    "You're a genuine and authentic soul.",
    "You have a heart that overflows with kindness.",
    "You're a true beacon of positivity and joy.",
    "You're a source of comfort and warmth for many.",
    "You have a heart that's as beautiful as a rainbow.",
    "You're an absolute delight to know.",
    "You have a way of making the ordinary extraordinary.",
    "You're a master at brightening someone's day.",
    "You have a spirit that can't be dimmed.",
    "You're a true example of goodness and grace.",
    "You have a heart that's as warm as a summer day.",
    "You're a blessing in the lives of those around you."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Compliment a person you love')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const message = `<@${user.id}>, ` + responses[Math.floor(Math.random() * responses.length)]
        interaction.reply({
            content: message,
        })
    }
}