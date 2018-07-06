//version 1.04, last updated 7/6/2018
//added a !meme command

var responses = [
"It is certain",
"It is decidedly so",
"Without a doubt",
"Yes, definitely",
"You may rely on it",
"As I see it, yes",
"Most likely",
"Outlook good",
"Yes",
"Signs point to yes",
"Reply hazy try again",
"Ask again later",
"Better not tell you now",
"Cannot predict now",
"Concentrate and ask again",
"Don't count on it",
"My reply is no",
"My sources say no",
"Outlook not so good",
"Very doubtful"];


//Discord.js stuff
const Discord = require("discord.js");
const client = new Discord.Client();

//file stuff
const fs = require("fs");	//file-reading stuff
var memes;					//array that holds our memes. Lol

function checkIfMemeInList(meme, list) {
	//TODO: searches the list of memes, string-compares each one to the meme in question, and returns 1 if a match is found
}


client.on("ready", () => {
	memes = fs.readFileSync("memes.txt", "utf8").split("\" \"");	//since I want memes to be able to span multiple lines, each entry is separated by 2 quotation marks, to symbolize it being a quote
	console.log("Boolin");
})


client.on("message", message => {
	//asking the bot a question
	//only respond if the bot was @'d
	if (message.mentions.users.first() != undefined) {
		if (message.mentions.users.first().username == "magiceightbot") {
			switch (Math.floor(Math.random() * 2)) {
			case 0:
				message.channel.sendMessage("Let me see...");
				break;
			case 1:
				message.channel.sendMessage("Hmmmmm...");
				break;
			}
			
			message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
			//}
		}
	}
	//roll command
	else if (message.content == "!roll")
		message.channel.sendMessage(Math.round(Math.random() * 1000000000));
	//meme command
	else if (message.content == "!meme")
		message.channel.sendMessage(memes[Math.floor(Math.random() * memes.length)]);
})


client.login("MjE5Mjc5Mzc2NjExNjcyMDY1.C0WBmw.BECStpd5u02JWH8kWG_ZL_Kw73A");	//lol don't steal my key