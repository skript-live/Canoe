module.exports.run = async (client, message, args) => {
	if (!args[0] && !args[1]) return await message.channel.send(`Missing Arguments... \`${conf.prefix}ignore [user|channel] [user|channel]\``)
};
