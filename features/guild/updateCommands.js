const Command = require("../../schemas/Command");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "updateCommands",
  async execute(client) {
    let final = [];
    await Command.deleteMany({});
    const commandsFolder = fs.readdirSync("./commands/");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        let toAddObj = {
          name: command.data.name,
          description: command.data.description,
          aliases: [],
          category: folder,
        };

        let reqArgs = command?.args?.required || [];
        let optArgs = command?.args?.optional || [];

        let usage = "";

        for (const arg of reqArgs) {
          usage += `<${arg.name}> `;
        }

        for (const arg of optArgs) {
          usage += `[${arg.name}] `;
        }
        toAddObj.usage = usage;
        final.push(toAddObj);
        await new Command(toAddObj).save();
        // console.log(`Saved Command: ${command.name}`);
      }
    }
  },
};
