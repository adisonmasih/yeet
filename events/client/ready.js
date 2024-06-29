module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready!!! ${client.user.tag} is Logged In!`);
    client.user.setPresence({
      activities: [
        {
          // type: 2,
          name: "with your mom 😼",
        },
      ],
      status: "online",
    });
    setInterval(() => {
      client.user.setPresence({
        activities: [
          {
            // type: "Listening",
            name: "with your mom 😼",
          },
        ],
        status: "online",
      });
    }, 30 * 1000 * 60);
    client.handleFeatures();
  },
};
