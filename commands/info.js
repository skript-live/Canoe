module.exports.run = async (client, message, args) => {
	if (!args[0] && args[0] !== 'guild' && args[0] !== 'user' && args[0] !== 'channel' && args[0] !== 'bot') return await message.channel.send(`Missing Arguments... \`${conf.prefix}info [guild|user|channel|bot] [value]\``)
	if (args[0] === 'guild') {
		return await message.channel.send(`${ms(message.guild.createdAt)} ago`)
	}
	if (args[0] === 'user') {
		return await message.channel.send(`${ms(message.author.createdAt)} ago`)
	}
	if (args[0] === 'channel') {
		return await message.channel.send(`${ms(message.channel.createdAt)} ago`)
	}
	if (args[0] === 'bot') {
		return await message.channel.send(`${ms(client.user.createdAt)} ago`)
	}
};
