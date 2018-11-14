const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, message) => {
    if (message.author.bot) return;
    const conf = client.settings.ensure(message.guild.id, defaultS);
    let messageDelete = client.settings.get(message.guild.id, 'messageDelete');
    messageDelete = messageDelete.replace('{user}', message.user)
    messageDelete = messageDelete.replace('{userName}', message.user.username)
    messageDelete = messageDelete.replace('{userTag}', message.user.tag)
    messageDelete = messageDelete.replace('{userId}', message.user.id)
    messageDelete = messageDelete.replace('{userDiscriminator}', message.user.discriminator)
    messageDelete = messageDelete.replace('{channel}', message.channel)
    messageDelete = messageDelete.replace('{channelName}', message.channel.name)
    messageDelete = messageDelete.replace('{channelId}', message.channel.id)
    message.guild.channels.find('name', client.settings.get(message.guild.id, 'logs')).send(messageDelete).catch(console.error);
};
