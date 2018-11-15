module.exports.run = async (client, message, args) => {
    MSG = await message.channel.send('Fetching Ping...');
    await MSG.edit([
        `**PING:** \`${MSG.createdTimestamp - message.createdTimestamp}ms\``,
        `**DiscordAPI:** \`${Math.round(client.ping)}ms\``
    ])
}