//version 1.05 - 7/7/2018
//Added an !addmeme command

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

function checkIfMemeInList(meme) {
	//TODO: searches the list of memes, string-compares each one to the meme in question, and returns 1 if a match is found
	//see if there's a way to do binary search on lists of strings (There probably is and I'm just dumb)
	for (var i = 0; i < memes.length; i++) {
		if (meme.localeCompare(memes[i]) == 0)
			return 1;
	}
	return 0;
}

function addMemeToList(meme) {
	//add meme to file
	var stream = fs.createWriteStream("memes.txt", {flags: 'a'});
	stream.write("\" \"" + meme);
	stream.end();
	//add meme to array
	memes.push(meme);
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
		}
	}
	//roll command
	else if (message.content == "!roll")
		message.channel.sendMessage(Math.round(Math.random() * 1000000000));
	//meme command
	else if (message.content == "!meme")
		message.channel.sendMessage(memes[Math.floor(Math.random() * memes.length)]);
	//add meme command
	else if (message.content.includes("!addmeme")) {
		var memeinquestion = message.content.substring(9, message.content.length);
		if (checkIfMemeInList(memeinquestion))
			message.channel.sendMessage("\"" + memeinquestion + "\" is already in the list");
		else {
			addMemeToList(memeinquestion);
			message.channel.sendMessage("\"" + memeinquestion + "\" has been added to the list");

		}
	}
})


client.login("key");