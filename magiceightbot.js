//1.10 - 8/23/19
//Changed the way memes are added - Instead of pushing and then sorting, it inserts into the already-sorted list, improving the time to O(n).

const responses = [
	'It is certain',
	'It is decidedly so',
	'Without a doubt',
	'Yes, definitely',
	'You may rely on it',
	'As I see it, yes',
	'Most likely',
	'Outlook good',
	'Yes',
	'Signs point to yes',
	'Reply hazy try again',
	'Ask again later',
	'Better not tell you now',
	'Cannot predict now',
	'Concentrate and ask again',
	'Don\'t count on it',
	'My reply is no',
	'My sources say no',
	'Outlook not so good',
	'Very doubtful'];

const fortunes = [
	'Extremely lucky',
	'Very lucky',
	'Lucky',
	'Slightly lucky',
	'You make your luck today',
	'Slightly unlucky',
	'Unlucky',
	'Very unlucky',
	'Extremely unlucky'];


//Discord.js stuff
const Discord = require('discord.js');
const client = new Discord.Client();

//file stuff
const fs = require('fs');	//file-reading stuff
var memes;			//array that holds our memes. Lol

//get the token
const token = fs.readFileSync('token.txt', 'utf8').replace('\n', '');


function checkIfMemeInList(meme) {
	//binary search the list of memes
	let a = 0, b = memes.length - 1;
	let middle;
	while (a <= b) {
		middle = Math.floor((a + b) / 2);
		if (meme < memes[middle])
			b = middle - 1;
		else if (meme > memes[middle])
			a = middle + 1;
		else
			return middle;
	}
	return -1;
}


function addMemeToList(meme) {
	//add meme to file
	let stream = fs.createWriteStream('memes.txt', {flags: 'a'});
	stream.write('\" \"' + meme);
	stream.end();
	//add meme to sorted array
	let i;
	for (i = memes.length - 1; i >= 0, memes[i] > meme; i--)
		memes[i + 1] = memes[i];
	memes[i + 1] = meme;
}


client.on('ready', () => {
	memes = fs.readFileSync('memes.txt', 'utf8').split('\" \"');	//since I want memes to be able to span multiple lines, each entry is separated by 2 quotation marks, to symbolize it being a quote
	memes.sort();
	console.log('Boolin');
})


client.on('message', message => {
	//DEBUG: log data to console
	//console.log(`${message.author.id}`);

	//randomly react a message, for comedic effect
	//EDIT: Whatever version of Discord.js I currently have right now won't let reactions happen, so sending a standard message will just have to suffice for the time being
	if (Math.floor(Math.random() * 50) == 0) {
		switch (Math.floor(Math.random() * 2)) {
		case 0:
			message.channel.sendMessage('<:virgin:612839782019629086>');
			break;
		case 1:
			message.channel.sendMessage('<:chad:612839780106895390>');
			break;
		}
	}

	//asking the bot a question
	//only respond if the bot was @'d
	if (message.mentions.users.first() != undefined) {
		if (message.mentions.users.first().username === 'magiceightbot') {
			switch (Math.floor(Math.random() * 2)) {
			case 0:
				message.channel.sendMessage('Let me see...');
				break;
			case 1:
				message.channel.sendMessage('Hmmmmm...');
				break;
			}

			message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
		}
	}
	//roll command
	else if (message.content.substring(0, 5) === '!roll') {
		roll_command = message.content.split(' '); //put the command and its arguments in an array
		//The second first (and only) argument of the array should be the number of digits generated (1-9, 9 by default)
		if (roll_command.length == 1)
			message.channel.sendMessage(Math.round(Math.random() * 1000000000));
		else if (roll_command.length == 2) {
			let roll_count = parseInt(roll_command[1]);
			if (roll_count != NaN && roll_count >= 1 && roll_count < 10)
				message.channel.sendMessage(Math.round(Math.random() * (Math.pow(10, roll_command[1]))));
		}
	}
	//meme command
	else if (message.content == '!meme')
		message.channel.sendMessage(memes[Math.floor(Math.random() * memes.length)]);
	//add meme command
	else if (message.content.length >= 9 && message.content.substring(0, 8) === '!addmeme') {
		var memeinquestion = message.content.substring(9, message.content.length);
		if (checkIfMemeInList(memeinquestion) != -1)
			message.channel.sendMessage(`\"${memeinquestion}\" is already in the list`);
		else {
			addMemeToList(memeinquestion);
			message.channel.sendMessage(`\"${memeinquestion}\" has been added to the list`);
		}
	}
	//fortune command
	else if (message.content === '!fortune')
		message.reply(`Your fortune for today is:\n**${fortunes[Math.floor(Math.random() * fortunes.length)]}**`);
	//developer !test command to make sure binary search on strings works as intended
	else if (message.content === '!test') {
		let count = 0;
		for (let i = 0; i < memes.length; i++) {
			if (checkIfMemeInList(memes[i]) == -1)
				count++;
		}
		console.log(`# of false negatives: ${count} / ${memes.length}`);
	}
})

client.login(token);
