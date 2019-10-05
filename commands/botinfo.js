"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');

module.exports = class botinfo {
    constructor() {
        this.name = "botinfo",
        this.alias = ['BotInfo', 'Botinfo'],
        this.usage = '!botinfo'
    }

    async run(bot, msg, args) {
        let botembed = new Discord.RichEmbed()
        .setAuthor("TheSkillzrReal")
        .setTitle(bot.user.username + " Home")
        .setURL("https://discord.gg/6eMzdks")
        .setDescription("Bot Information: darkoinker is the best trainer")
        .setColor("#00bcd4")
        .setThumbnail(msg.author.avatarURL)
        .addField("Bot Name", bot.user.username)
        .addBlankField()
        .addField("Current Abilities", "List Will Be Updated Soon", true)
        .addField("Created On", bot.user.createdAt)
        .setTimestamp()
        .setFooter("Thanks for checking out my information!");

        return msg.channel.send(botembed);
    }
}