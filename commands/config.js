module.exports.run = async (client, message, args) => {
	const conf = client.settings.ensure(message.guild.id, defaultS);
	if (!message.member.hasPermission('MANAGE_SERVER')) {
		return await message.channel.send(conf.noAccess);
	}
	if (!args[0] && !args[1]) {
		const prefix = client.settings.get(message.guild.id, 'prefix');
		if (!prefix) prefix = conf.prefix;
		const noAccess = client.settings.get(message.guild.id, 'noAccess');
		if (!noAccess) noAccess = conf.noAccess;
		const modRole = client.settings.get(message.guild.id, 'modRole');
		if (!modRole) modRole = conf.modRole;
		const logs = client.settings.get(message.guild.id, 'logs');
		if (!logs) logs = conf.logs;
		const welcome = client.settings.get(message.guild.id, 'welcome');
		if (!welcome) welcome = conf.welcome;
		const leave = client.settings.get(message.guild.id, 'leave');
		if (!leave) leave = conf.leave;
		return await message.channel.send([
			prefix,
			noAccess,
			modRole,
			logs,
			welcome,
			leave
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
