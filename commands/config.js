module.exports.run = async (client, message, args) => {
	const conf = client.settings.ensure(message.guild.id, defaultS);
	if (!message.member.hasPermission('MANAGE_SERVER')) {
		return await message.channel.send(conf.noAccess);
	}
	if (!args[0] && !args[1]) {
		return await message.channel.send([
			conf.prefix,
			conf.noAccess,
			conf.modRole,
			conf.welcome,
			conf.leave
		])
	}
	if (args[0] === 'reset' && !args[1]) {
		client.settings.delete(message.guild.id);
		return await message.channel.send(`Successfully reset all configuration.`)
	}
	const [prop, ...value] = args;
	if (args[0] === 'reset' && args[1]) {
			if(!client.settings.has(message.guild.id, prop)) return await message.channel.send('Read my documentation: https://canoe.forums.gg/docs')
			client.settings.delete(message.guild.id, prop);
			return await message.channel.send(`Successfully reset ${prop}.`)
	}
    if(!client.settings.has(message.guild.id, prop)) return await message.channel.send('Read my documentation: https://canoe.forums.gg/docs')
    client.settings.set(message.guild.id, value.join(' '), prop);
    return await message.channel.send(`Successfully updated ${prop} to:\n\`${value.join(' ')}\``)
};
