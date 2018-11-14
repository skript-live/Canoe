const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, member) => {
    const conf = client.settings.ensure(member.guild.id, defaultS);
    let welcome = client.settings.get(member.guild.id, 'welcome');
    welcome = welcome.replace('{user}', member.user.tag)
    welcome = welcome.replace('{userName}', member.user.username)
    welcome = welcome.replace('{userTag}', member.user.tag)
    welcome = welcome.replace('{userId}', member.user.id)
    welcome = welcome.replace('{userDiscriminator}', member.user.discriminator)
    member.guild.channels.find('name', client.settings.get(member.guild.id, 'logs')).send(welcome).catch();
});
    
