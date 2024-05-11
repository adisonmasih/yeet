const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolder = fs.readdirSync("./commands/");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Loaded Command: ${command.data.name}`);
        if (command?.init) {
          await command?.init?.(client);
        }
      }
    }

    const clientId = "990577825922842634";
    const guildId = "1176911294205546496";

    const res = new REST({ version: "9" }).setToken(process.env.TOKEN);
    try {
      console.log(`Started refreshing application (/) commands`);
      const guildCommands = client.commandArray.filter(
        (command) => command.testOnly
      );
      const applicationCommands = client.commandArray.filter(
        (command) => !command.testOnly
      );
      await res.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: guildCommands,
      });
      await res.put(Routes.applicationCommands(clientId), {
        body: applicationCommands,
      });
      console.log(`Successfully reloaded application (/) commands`);
    } catch (e) {
      console.error(e);
    }
  };
};
