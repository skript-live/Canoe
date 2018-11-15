module.exports = (client, oldMessage, newMessage) => {
 	const message = oldMessage
	if (message.author.bot || !message.guild) return;
 	if (oldMessage === newMessage) return;
 	if (oldMessage && !newMessage) return;
	const conf = client.settings.ensure(message.guild.id, defaultS);
	if (conf.hush === 'true') return;
	log = message.guild.channels.find(c => c.name === client.settings.get(message.guild.id, 'logs'))
	if (log) {
		await log.send([
			`:wastebasket: ${message.author.tag) \`(${message.author.id})\` message \`(${message.id})\` edited in ${message.channel}:`,
			`**B:**`,
			message.cleanContent
			``,
			`**A:**,
			newMessage.cleanContent
		])
		.catch();
	}
};
