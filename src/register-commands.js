require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "overview",
    description: "Replies with basic overview of the requested user's Apex Legends statistics.",
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

exports.register_commands = async (guilds) => {
  try {
    console.log("Registering slash commands...");

    guilds.forEach(async(guild) => {
        await rest.put(
            Routes.applicationGuildCommands(
              process.env.CLIENT_ID,
              guild
            ),
            { body: commands }
          );
    })
    

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
}