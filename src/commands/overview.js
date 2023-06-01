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

    if (data == null) {
        interaction.reply("Error getting stats of player, please verify the account is valid on tracker network.");
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle(`${data['platformInfo']['platformUserId']}'s Apex Legends Statistics`)
        .setColor('ff0000')
        .setThumbnail("https://i.imgur.com/IPkTAct.png")
        .addFields(
            {
                name: 'Account Level',
                value: getLevel(data),
                inline: true,
            },
            {
                name: 'Lifetime Kills',
                value: getLifetimeKills(data),
                inline: true,
            },
            {
                name: 'Lifetime Wins',
                value: getLifetimeWins(data),
                inline: true,
            },
            {
                name: 'Lifetime Damage',
                value: getLifetimeDamage(data),
                inline: true,
            },
            {
                name: 'Ranked Points',
                value: getRankedPoints(data),
                inline: true,
            }
        );
    
    interaction.reply({ embeds: [embed] });
};

function getStats(data) {

    return data['segments'][0]['stats'];
}

function getLevel(data) {
    try {
        return getStats(data)['level']['displayValue'];
    } catch (error) {
        return "N/A";
    }
    
}

function getLifetimeKills(data) {
    try {
        return getStats(data)['kills']['displayValue'];
    } catch (error) {
        return "N/A";
    }
}

function getLifetimeWins(data) {
    try {
        return getStats(data)['wins']['displayValue'];
    } catch (error) {
        return "N/A";
    }
}

function getLifetimeDamage(data) {
    try {
        return getStats(data)['damage']['displayValue'];
    } catch (error) {
        return "N/A";
    }
}

function getRankedPoints(data) {
    try {
        return getStats(data)['rankScore']['displayValue'];
    } catch (error) {
        return "N/A";
    }
}