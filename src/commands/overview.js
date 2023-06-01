const {
    EmbedBuilder
  } = require('discord.js');
const { requestPlayerData } = require("../https/apex-trn-request");

module.exports = async function (interaction) {
    platform_raw = interaction.options.get("platform").value;
    username = interaction.options.get("username").value;
    platform = "";

    if (platform_raw.toLowerCase() === "xbox" || platform_raw.toLowerCase() === "xbl") {
        platform = "xbl"
    }
    else if (platform_raw.toLowerCase() === "playstation" || platform_raw.toLowerCase() === "psn") {
        platform = "psn"
    }
    else if (platform_raw.toLowerCase() === "origin" || platform_raw.toLowerCase() === "steam" || platform_raw.toLowerCase() === "pc") {
        platform = "origin"
    }

    data = await requestPlayerData(platform, username);

    const embed = new EmbedBuilder()
        .setTitle(`${data['platformInfo']['platformUserId']}'s Apex Legends Statistics`)
        .setColor('ff0000')
        .setThumbnail("https://i.imgur.com/IPkTAct.png")
        .addFields(
            {
                name: 'Account Level',
                value: '1000',
                inline: true,
            },
            {
                name: 'Overall Kills',
                value: '1000',
                inline: true,
            },
            {
                name: 'Overall K/D',
                value: '10.0',
                inline: true,
            }
        );
    
    interaction.reply({ embeds: [embed] });
};