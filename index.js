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
    if (message.channel.type === 'dm') return;
    if (message.author.type === 'bot') return;
    
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    var condition = false;
    var createNewUser = false;
    //The "* 20" means the exp per message, since on average someone will get 20 exp per message
    var amountXPToLevelUp = 5 * 20;
     
    //* basically means all
    con.query(`SELECT * FROM users WHERE discordid = '${message.author.id}'`, (err, rows) => {
        if (err) throw err;

        rows = rows['rows'];
        let sql;

        console.log("This is what rows display\n");
        console.log(rows);
        //If the user doesn't exist
        if (rows.length < 1) {
            let name = message.member.user.tag;
            name = name.split("#")[0];
            console.log("name is " + name);
            let discordid = '' + message.author.id;
            con.query("INSERT INTO users (discordid, name, exp, level) VALUES (:discordID, :discordName, 0, 1)",
            {
                discordID: discordid,
                discordName: name
            },
            (err) => {
                if (err) throw err;
            });
            // sql = `INSERT INTO users (discordid, name, exp, level) 
            //     VALUES ('${message.author.id}', '${name}', ${generateXP()}, 1)`;
            createNewUser = true;
            console.log("Generating new user");
        } else {
            console.log("We are found inside the else statement");
            var exp = rows[0].exp + generateXP(); 
            console.log("1");
            //Add on XP by updating the value there
            let level = rows[0].level;
            console.log("2");
            if (exp > amountXPToLevelUp) {
                sql =  `update users set level = ${level + 1} where discordid = '${message.author.id}'`;
                condition = true;
                console.log("if statement was triggered");
            } else {
                sql = `UPDATE users SET exp = ${exp} WHERE discordid = '${message.author.id}'`;
                console.log("else was triggered");
            }
            console.log("3");
        }

        console.log("4");
        if (!createNewUser) {
            con.query(sql, (err) => {
                if (err) throw err;
            });
        }
        console.log("5");
        if (condition) {
            con.query(`update users set exp = ${exp - amountXPToLevelUp} where discordid = '${message.author.id}'`);
        }
        console.log("6");
    })

    if(!cmd) return;
    try {
        cmd.run(bot, message, args, con)
    } catch(error){
        console.log(error)
    }

});