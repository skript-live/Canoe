const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, member) => {
	const conf = client.settings.ensure(member.guild.id, defaultS);
	let welcome = client.settings.get(member.guild.id, 'welcome');
	welcome = welcome.replace('{user}', member.user.tag)
	.replace('{userName}', member.user.username)
	.replace('{userTag}', member.user.tag)
	.replace('{userId}', member.user.id)
	.replace('{userDiscriminator}', member.user.discriminator)
	log = member.guild.channels.find(c => c.name === client.settings.get(member.guild.id, 'logs'))
	if (log) {
		log.send(welcome).catch();
	}
};
	
