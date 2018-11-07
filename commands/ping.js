module.exports.run = async (client, message, args) => {
    MSG = await message.channel.send('Fetching Ping...');
    await MSG.edit(`While my Ping is \`${MSG.createdTimestamp - message.createdTimestamp}ms\`, my ping to the DiscordAPI is \`${Math.round(client.ping)}ms\`.`)
}
