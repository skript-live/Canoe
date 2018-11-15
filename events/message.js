module.exports = (client, message) => {
    if (message.author.bot) return;
    const conf = client.settings.ensure(message.guild.id, defaultS);
    const prefix = conf.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.run(client, message, args);
};
