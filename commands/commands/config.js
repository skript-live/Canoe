module.exports.run = async (client, message, args) => {
	const conf = client.settings.ensure(message.guild.id, defaultS);
	if (!message.member.hasPermission('MANAGE_SERVER')) {
		let noAccess = client.settings.get(message.guild.id, 'noAccess');
		message.channel.send(noAccess);
		return;
	}
	if (!args[0] && !args[1]) {
		message.channel.send([
			conf.prefix,
			conf.noAccess,
			conf.modRole,
			conf.welcome,
			conf.leave,
			conf.messageDelete
		])
		return;
	}
	if (args[0] === 'reset') {
		client.settings.delete(message.guild.id);
		return await message.channel.send([
			`:white_check_mark: All Configuration has been reset`,
			`My prefix is now \`can (help)\``
		])
	}
	if (args[0] === 'prefix') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, prefix);
			return message.channel.send (':white_check_mark: Reset the prefix.')
		}
		if (args[1].length > 8) return message.channel.send('The length of the prefix must be < 8')
		client.settings.set(message.guild.id, args[1], 'prefix');
		message.channel.send(`:white_check_mark: Updated Configuration...`)
		return;
	}
	if (args[0] === 'noAccess') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, noAccess);
			return message.channel.send (':white_check_mark: Reset the noAccess message.')
		}
		return;  
	}
	if (args[0] === 'modRole') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, modRole);
			return message.channel.send (':white_check_mark: Reset the modRole.')
		}
		return;  
	}
	if (args[0] === 'logs') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, prefix);
			return message.channel.send (':white_check_mark: Reset the logs channel.')
		}
		return;  
	}
	if (args[0] === 'welcome') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, prefix);
			return message.channel.send (':white_check_mark: Reset the welcome message.')
		}
		return;  
	}
	if (args[0] === 'leave') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, prefix);
			return message.channel.send (':white_check_mark: Reset the farewell message.')
		}
		return;  
	}
	if (args[0] === 'messageDelete') {
		if (args[1] === 'reset') {
			client.settings.delete(message.guild.id, prefix);
			return message.channel.send (':white_check_mark: Reset the messageDelete message.')
		}
		return;  
	}
	else {
	  return message.channel.send('Read my documentation: https://canoe.forums.gg/docs')
	}
};