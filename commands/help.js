"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');
const mysql = require("mysql");

module.exports = class help {
    constructor() {
        this.name = "help",
        this.alias = ['help'],
        this.usage = '!help'
    }

    async run(bot, message, args, con) {
        let embed = new Discord.RichEmbed()
        .setAuthor('Help Page')
        .addBlankField()
        .addField("!botinfo", "Gives information about the bot", true)
        .addField("!serverinfo", "Gives information about the server", true)
        .addField("!botRename", "Renames your bot", true)
        .addField("!inzult", "Inzults you", true)
        .addField("!purge", "Purges X comments, usage is !purge ____ (number of messages)", true)
        .setFooter("Feel Free to DM Me if There Are Concerns");

        return msg.channel.send(embed);
    }
}