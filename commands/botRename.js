"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');

module.exports = class botRename {
    constructor() {
        this.name = "botRename",
        this.alias = ['botRename'],
        this.usage = '!botRename'
    }

    async run(bot, msg, args) {
		if(msg.guild.roles.find(role => role.name === "Bot Master") != undefined) {
            let nick = "";
            var i = 0;
			args.forEach(element => {
                if (i != 0) nick += element + " ";
                i++;
			})
			msg.guild.members.get(bot.user.id).setNickname(nick);
		}
    }
}

