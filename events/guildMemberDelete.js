const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, member) => {
    const conf = client.settings.ensure(member.guild.id, defaultS);
    let welcome = client.settings.get(member.guild.id, 'leave');
    leave = welcome.replace('{user}', member.user.tag)
    member.guild.channels.find('name', client.settings.get(member.guild.id, 'logs')).send(leave).catch(console.error);
});
    
