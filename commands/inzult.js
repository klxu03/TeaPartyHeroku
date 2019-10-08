"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');

module.exports = class inzult {
    constructor() {
        this.name = "inzult",
        this.alias = ['i'],
        this.usage = '!inzult'
    }

    async run(bot, msg, args) {
        console.log("Inzult");
        msg.channel.send("You need some sleep " + (msg.mentions.members.first() || msg.author));
    }
}

