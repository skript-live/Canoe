function evalClean(text) {
	if (typeof(text) === 'string')
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	else
		return text;
	}
	
module.exports.run = async (client, message, args) => {
	if (message.author.id == '221659063312842752') {
		try {
			const conf = client.settings.ensure(message.guild.id, defaultS);
			const code = args.join(' ');
			let evaled = await eval(code);
			if (typeof evaled !== 'string')
				evaled = require('util').inspect(evaled);
			await message.channel.send(evalClean(evaled), {code:'xl'});
		} catch (err) {
			await message.channel.send(`${evalClean(err)}`)
	}
}};
