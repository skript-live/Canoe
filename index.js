const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Enmap();
client.config = require('./config.json');
client.settings = new Enmap({
	name: 'settings',
	dataDir: './data',
	autoFetch: true,
	fetchAll: false,
	clonelevel: 'deep'
});
defaultS = {
	prefix: 'can ',
	logs: 'false',
	welcome: 'false',
	leave: 'false',
};

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		console.log(`Loaded event '${eventName}'`)
		client.on(eventName, event.bind(null, client));
	});
});

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		console.log(`Loaded command '${commandName}'`);
		client.commands.set(commandName, props);
	});
});

setInterval (function () {
    //ONCE PER 10 MINS
}, 600000); 

client.on('ready', () => {
	console.log(`Successfully logged in as ${client.user.tag}`);
});

client.on('error', console.error);
client.on('promiseRejection', console.error);

client.login(config.token);
