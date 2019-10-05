"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');

module.exports = class serverinfo {
    constructor() {
        this.name = "serverinfo",
        this.alias = ['serverinfo'],
        this.usage = '!serverinfo'
    }

    async run(bot, msg, args) {
        let sicon = msg.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		.setAuthor("TheSkillzrReal")
		.setTitle("The " + msg.guild.name + " Server")
		.setURL("https://discord.gg/6eMzdks")
		.setThumbnail(sicon)
		.addField("Server Created On", msg.guild.createdAt)
		.addField("You Joined", msg.member.joinedAt)
		.addField("Total Members", msg.guild.memberCount)
		.setTimestamp()
		.setFooter("Thanks for joining the server");

		return msg.channel.send(serverembed);
    }
}