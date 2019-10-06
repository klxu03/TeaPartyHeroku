"use strict";
const Discord = require('discord.js');
const bot = new Discord.Client();
//No need for mySQL anymore
//const mysql = require("mysql");

const { Client } = require("pg");

const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

bot.commands = new Discord.Collection();

const { CommandHandler } = require("djs-commands");
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: [process.env.prefix]
  });

const token = process.env.token;

bot.login(token);

//mySQL code that can be commented out
/*var con = mysql.createConnection({
    host: "localhost",
    //port: 3306,
    user: "root",
    password: process.env.sqlPass,
    database: "teaparty"
});*/

//mySQL code that can be commented out
/* con.connect(err => {
    if (err) throw err;
    console.log("Connected to Database");
    con.query("SHOW TABLES", console.log);
});*/

con.connect(err => {
    if (err) throw err;
    console.log("Connected to Database");
    con.query("SHOW TABLES", console.log);
});



/*
Starts with the Bot Ready protocol
First established the activity of the bot
Then logs in the console each channel ID
Finally it mentions in a channel that the bot is updated
*/
bot.on('ready', () => {
	console.log(`${bot.user.username} is online!`);

	bot.user.setActivity("with TeaParty", {type: "PLAYING"});

	bot.guilds.forEach((guild) => {
		console.log(guild.name);
		guild.channels.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
		})
		// general channel id: 609037015635460098
		let generalChannel = bot.channels.get("609037015635460098");
        generalChannel.send("Bot Updated");
	})
});

//Returns int value of amount of XP generated
function generateXP() {
    let min = 10;
    let max = 30;
    
    return Math.floor(Math.random() * (max - min)) + min;
}

bot.on("message", (message) => {
    if(message.channel.type === 'dm') return;
    if(message.author.type === 'bot') return;
    
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    var condition = false;
    //The "* 20" means the exp per message, since on average someone will get 20 exp per message
    var amountXPToLevelUp = 5 * 20;
     
    //* basically means all
    con.query(`SELECT * FROM xp WHERE discordid = '${message.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        //If the user doesn't exist
        if (rows.length < 1) {
            let name = message.member.user.tag;
            name = name.split("#")[0];
            console.log("name is " + name);
            sql = `INSERT INTO xp (discordid, name, exp, level) VALUES ('${message.author.id}', "" + "${name}", ${generateXP()}, 1)`
            console.log("Generating new user");
        } else {
            var exp2 = rows[0].exp + generateXP(); 
            //Add on XP by updating the value there
            let level = rows[0].level;
            if (exp2 > amountXPToLevelUp) {
                sql =  `update xp set level = ${level + 1} where discordid = "${message.author.id}"`;
                condition = true;
            } else {
                sql = `UPDATE xp SET exp = ${exp} WHERE discordid = '${message.author.id}'`;
            }
        }

        con.query(sql);
        if (condition) con.query(`update xp set exp = ${exp - amountXPToLevelUp} where discordid = "${message.author.id}"`);
    })

    if(!cmd) return;
    try {
        cmd.run(bot, message, args, con)
    } catch(error){
        console.log(error)
    }

});