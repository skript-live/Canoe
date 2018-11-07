module.exports.run = async (client, message, args) => {
    const conf = client.settings.ensure(message.guild.id, defaultS);
    const prefix = conf.prefix;
    message.channel.send([
        `\`${prefix}help\`: \`list of commands\``,
        `\`${prefix}ping\`: \`view the bot's ping\``,
        `\`${prefix}uptime\`: \`view the bot's uptime\``
    ])
}
