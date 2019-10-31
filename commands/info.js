"use strict";
const { CommandHandler } = require('djs-commands');
const Discord = require('discord.js');
const mysql = require("mysql");

module.exports = class info {
    constructor() {
        this.name = "info",
        this.alias = ['info'],
        this.usage = '!info'
    }

    async run(bot, msg, args, con) {
        let target = msg.mentions.members.first() || msg.author;

        let level; 
        let exp; 
        let multiplier; 
        let condition = true;

        con.query(`SELECT * FROM users WHERE discordid = '${target.id}'`, (err, rows) => {
            if (err) throw err;
            //Fixes issues regarding "rows" accessing
            rows = rows['rows'];

            //If there are now rows with this username
            if (!rows[0]) {
                condition = false;
                return msg.channel.send("This user does not have any XP");
            }

            level = rows[0].level;
            exp = rows[0].exp;

            multiplier = 20;
            if (level < 20) multiplier = level; 

            msg.channel.send(exp + "/" + (multiplier * 20000) + " xp");
            msg.channel.send("Your level is " + level);
        })

        let XPString = "" + exp + "/" + (multiplier * 20000) + " xp"

        let profile = new Discord.RichEmbed()
        .setAuthor(target)
        .setColor("#00bcd4")
        .addField("Current Level", level, true)
        .addField("Current XP Inside Level", XPString, true)
        .setFooter("Feel Free to DM Me if There Are Concerns");

        return msg.channel.send(profile);

        //console.log("Hello " + msg.member.user.tag);
    }
}