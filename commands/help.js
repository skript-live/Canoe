module.exports.run = async (client, message, args) => {
    message.channel.send([
        `\`${client.config.prefix}help\`: \`Why hello there\``
    ])
}
