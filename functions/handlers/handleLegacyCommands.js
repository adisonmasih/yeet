const fs = require("fs");

module.exports = (client) => {
  client.handleLegacyCommands = async () => {
    const commandsFolder = fs.readdirSync("./legacyCommands/");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./legacyCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { legacyCommands, legacyCommandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../legacyCommands/${folder}/${file}`);
        legacyCommands.set(command.name, command);
        legacyCommandArray.push(command);
        if (command.aliases) {
          for (const alias of command.aliases) {
            legacyCommands.set(alias, command);
          }
        }
        console.log(`Loaded Legacy Command: ${command.name}`);
      }
    }
  };
};
