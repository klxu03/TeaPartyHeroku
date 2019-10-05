"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');
const mysql = require("mysql");

module.exports = class template {
    constructor() {
        this.name = "template",
        this.alias = ['thing1', "thing2"],
        this.usage = '!thing'
    }

    async run(bot, message, args, con) {
        //Insert Your Code
    }
}