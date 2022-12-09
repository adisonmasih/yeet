const fs = require("fs");
module.exports = (client) => {
  client.handleFeatures = async () => {
    const featuresFolder = fs.readdirSync("./features");
    for (const folder of featuresFolder) {
      const featureFiles = fs
        .readdirSync(`./features/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of featureFiles) {
        const feature = require(`../../features/${folder}/${file}`);
        try {
          await feature.execute(client);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
};
