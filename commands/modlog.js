module.exports.run = async (client, message, args) => {
	const conf = client.settings.ensure(message.guild.id, defaultS);
	if(args[0]) return await message.channel.send(`Missing Arguments... \`${conf.prefix}modlog [hush|unhush]\``)
	if (args[0] !== 'hush' && !== args[0] !== 'unhush') return await message.channel.send('Incorrect usage... \`${conf.prefix}modlog [hush|unhush]\``)
	if (args[0] === 'hush')
		if (conf.hush === 'true') return await message.channel.send(`Modlog is already hushed.`)
		client.settings.set(message.guild.id, 'true', 'hush')
		return await message.channel.send(`Hushed the Modlog...`)
	if (conf.hush === 'false') return await message.channel.send(`Modlog is not hushed.`)
	client.settings.set(message.guild.id, 'false', 'hush')
	return await message.channel.send(`Unhushed the Modlog...`)	
}
