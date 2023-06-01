require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { register_commands } = require("./register-commands");
const commandHandler = require("./handlers/command-handler");
const { requestPlayerData } = require("./https/apex-trn-request");

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

  client.user.setActivity({name: "Attrition on Angel City."});
});

commandHandler(client);

async function getPlayerData() {
  data = await requestPlayerData("origin", "aclownsquad");

  console.log(data['segments']);
}

getPlayerData();


client.login(process.env.TOKEN);