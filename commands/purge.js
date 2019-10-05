"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');

module.exports = class botinfo {
    constructor() {
        this.name = "purge",
        this.alias = ['purge'],
        this.usage = '!purge'
    }

    async run (bot, msg, args) {
        if (isNaN(args[1])) {
            msg.channel.send("Please use a number as the argument");
            return;
        }

        msg.delete();

        const fetched = args[1];

        msg.channel.bulkDelete(fetched).then(() => {
            msg.channel.send("Deleted " + fetched + " messages.").then(msg => msg.delete(1500));
        }).catch(error => msg.channel.send(`Error: ${error}`));
        msg.delete(1500);
    }
}    