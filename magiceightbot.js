//1.06 - 7/8/2018
//Changed the linear search on the list of memes to a binary search to make speed better as the list continues to grow.

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
	//binary search the list of memes
	var a = 0, b = memes.length - 1;
	var middle, sign;
	while (a <= b) {
		middle = Math.floor((a + b) / 2);
		sign = strcmp(meme, memes[middle]);
		if (sign < 0)
			b = middle - 1;
		else if (sign > 0)
			a = middle + 1;
		else
			return middle;
	}
	return -1;
}


function strcmp(str1, str2) {
	//since localeCompare() doesn't compare strings the same way that sort() does (At least I can't figure out a way to do it), this function compares strings in Unicode order, similar to the strcmp() function in the C standard library.
	var count = 0, c1 = 0, c2 = 0;
	while (count < str1.length) {
		c1 = str1.charCodeAt(count);
		if (count == str2.length)  {
			c2 = 0;
			break;
		}
		c2 = str2.charCodeAt(count);
		if (str1.charAt(count) == str2.charAt(count))
			count++;
		else
			break;
	}
	return c1 - c2;
}


function addMemeToList(meme) {
	//add meme to file
	var stream = fs.createWriteStream("memes.txt", {flags: 'a'});
	stream.write("\" \"" + meme);
	stream.end();
	//add meme to array
	memes.push(meme);
	memes.sort();
}


client.on("ready", () => {
	memes = fs.readFileSync("memes.txt", "utf8").split("\" \"");	//since I want memes to be able to span multiple lines, each entry is separated by 2 quotation marks, to symbolize it being a quote
	memes.sort();
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
		if (checkIfMemeInList(memeinquestion) != -1)
			message.channel.sendMessage("\"" + memeinquestion + "\" is already in the list");
		else {
			addMemeToList(memeinquestion);
			message.channel.sendMessage("\"" + memeinquestion + "\" has been added to the list");
		}
	}
	//developer !test command to make sure binary search on strings works as intended
	else if (message.content == "!test") {
		console.log(memes[0].localeCompare(memes[0]));
		var count = 0;
		for (var i = 0; i < memes.length; i++) {
			if (checkIfMemeInList(memes[i]) == -1)
				count++;
		}
		console.log("# of false negatives: " + count + "/" + memes.length);
	}
})


client.login("token");