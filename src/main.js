require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { register_commands } = require("./register-commands");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
  const Guilds = client.guilds.cache.map(guild => guild.id);

  register_commands(Guilds);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "overview") {
    return interaction.reply("Here's an overview!");
  }
});

client.login(process.env.TOKEN);