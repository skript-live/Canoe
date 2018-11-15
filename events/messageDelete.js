const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, message) => {
	if (message.author.bot) return;
	let messageDelete = client.settings.get(message.guild.id, 'messageDelete');
	messageDelete = messageDelete.replace('{message}', message.content)
	.replace('{cleanMessage}', message.cleanContent)
	.replace('{user}', message.author)
	.replace('{userName}', message.author.authorname)
	.replace('{userTag}', message.author.tag)
	.replace('{userId}', message.author.id)
	.replace('{userDiscriminator}', message.author.discriminator)
	.replace('{channel}', message.channel)
	.replace('{channelName}', message.channel.name)
	.replace('{channelId}', message.channel.id)
	log = message.guild.channels.find(c => c.name === client.settings.get(message.guild.id, 'logs'))
	if (log) {
		log.send(messageDelete).catch();
	}
};
