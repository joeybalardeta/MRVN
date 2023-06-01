require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "overview",
    description: "Replies with basic overview of the requested user's Apex Legends statistics.",
    options: [
        {
          name: "platform",
          description: "The platform of the user.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "username",
          description: "The username of the user.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
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