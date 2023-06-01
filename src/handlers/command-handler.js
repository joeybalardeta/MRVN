require('dotenv').config();
const {
  Client,
  IntentsBitField,
} = require('discord.js');
const overview = require('../commands/overview');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


module.exports = (client) => {
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;
      
        if (interaction.commandName === "overview") {
            overview(interaction);
            return;
        }
      });
  };