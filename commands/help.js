module.exports.run = async (client, message, args) => {
    const conf = client.settings.ensure(message.guild.id, defaultS);
    const prefix = conf.prefix;
    message.channel.send([
        `\`${prefix}help\`: \`Why hello there\``,
        `\`${prefix}ping\`: \`View the bot's ping\``
    ])
}
