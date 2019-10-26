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
        var inzult = ["You need some sleep ", "You are a flop ", "You suck ", "Literally stop ", "Sooper sooper oof ", "You Flop! You are AMAZING <3 "];
        let max = inzult.length - 1;
        console.log("The inzult.length is " + max);
        let insult = Math.floor(Math.random() * max);

        msg.channel.send(inzult[insult] + (msg.mentions.members.first() || msg.author ) + "!");
    }
}

