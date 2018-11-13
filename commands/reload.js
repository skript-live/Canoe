module.exports.run = (client, message, args) => {
    const conf = client.settings.ensure(message.guild.id, defaultS);
    const prefix = conf.prefix;
    if(!args[0] || args[0].size < 1) return message.channel.send(`**USAGE:** \`${prefix}reload [<filename>]\``)
    const commandName = args[0];
    if (commandName === 'index' && commandName === 'all') {
        fs.readdir('./commands/', (err, files) => {
	       if (err) return console.error(err);
	            files.forEach(file => {
		        if (!file.endsWith('.js')) return;
		            let props = require(`./commands/${file}`);
		            let commandName = file.split('.')[0];
		            console.log(`Loaded command '${commandName}'`);
		            client.commands.set(commandName, props);
	            });
            });
    return;
    if(!client.commands.has(commandName)) {
        return message.reply(`It seems \`${args[0]}.js\` does not exist.`);
    }
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.channel.send(`Successfully reloaded \`${commandName}.js\`.`);
  };
