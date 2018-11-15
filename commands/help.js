module.exports.run = async (client, message, args) => {
	const conf = client.settings.ensure(message.guild.id, defaultS);
	const prefix = conf.prefix;
	message.channel.send([
		`View the Documentation here: https://canoe.forums.gg/documentation`
	])
}
