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
        
        con.query(`SELECT * FROM users WHERE discordid = '${target.id}'`, (err, rows) => {
            if (err) throw err;
            rows = rows['rows'];

            if (!rows[0]) {
                return msg.channel.send("This user does not have any XP");
            }
            let exp = rows[0].exp;
            msg.channel.send(exp + "/100 xp");
            let level = rows[0].level;
            msg.channel.send("Your level is " + level);
        })

        //console.log("Hello " + msg.member.user.tag);
    }
}