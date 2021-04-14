const Discord = require('discord.js');

const client = new Discord.Client({ 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const fs = require('fs');

const prefix = 'b2!'

client.commands = new Discord.Collection();

require('dotenv').config();
var token = process.env.token;

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
const command = require(`./commands/${file}`);
client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

module.exports = client;

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if(command === 'trivia') {
        client.commands.get('trivia').execute(message, args);
    } else if(command === 'connect4') {
        client.commands.get('connect4').execute(message, args);
    } else if(command === 'gameshelp') {
        client.commands.get('help').execute(message, args);
    } 

});

client.login(token);