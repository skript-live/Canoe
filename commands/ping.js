module.exports.run = async (client, message, args) => {
    message.channel.send([
        `(api ping) \`${client.ping}ms\``
    ])
}
