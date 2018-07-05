//version 1.02, last updated 1/24/17
//removed the feature I added last version where you HAD to ask it a question

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


const Discord = require("discord.js");
const client = new Discord.Client();


client.on("ready", () => {
	console.log("Boolin");
})


client.on("message", message => {
	//only respond if the bot was @'d
	if (message.mentions.users.first() != undefined) {
		if (message.mentions.users.first().username == "magiceightbot") {
			//if (message.content.charAt(message.content.length - 1) != '?')
			//	message.channel.sendMessage("Ask a question dumbass");		//got rid of this feature because its funnier to respond to any message like it's a question
			//else {
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
})


client.login("MjE5Mjc5Mzc2NjExNjcyMDY1.C0WBmw.BECStpd5u02JWH8kWG_ZL_Kw73A");