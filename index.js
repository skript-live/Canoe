const Discord = require('discord.js');
const client = new Discord.Client({disableeveryone: true});
const config = require('./config.json')
const Enmap = require('enmap')
const myEnmap = new Enmap({name: 'points'});
client.settings = new Enmap({
	name: 'settings',
	dataDir: './data',
	autoFetch: true,
	fetchAll: false,
	clonelevel: 'deep'
});
defaultS = {
	prefix: '!',
	antiadvert: 'false',
	logs: 'disabled'
};
//

//

client.on('error', console.error);
client.on('promiseRejection', console.error);

client.on('ready', () => {
	console.log('Successfully loaded.');
});

client.on('guildCreate', guild => {
	console.log(`\n${guild.name}(${guild.id}) added me to their server.\n`);
});

client.on('guildDelete', guild => {
	console.log(`\n${guild.name}(${guild.id}) removed me from their server.\n`);
	client.settings.delete(guild.id);
});

//

client.on('messageDelete', message => {
	if (message.author.bot) return;
	client.settings.ensure(message.guild.id, defaultS);
	//
	conf = client.settings.ensure(message.guild.id, defaultS);
	logs = conf.logs;
	//
	if (logs) {
		logs.send('Hey')
	}
});
		
//

async function reactDelete(MSG, message) {
    await MSG.react('🗑');
    try {
        react = await MSG.awaitReactions(
            (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
            { max: 1, time: 90000, errors: ['time'] }
        );
        } catch (error) {
            MSG.clearReactions();
            return MSG;
        }
        react.first().message.delete();
        message.delete();
        return MSG;    
	}

//

client.on('message', async message => {
	if(message.author.bot) return;
	//
	conf = client.settings.ensure(message.guild.id, defaultS);
	prefix = conf.prefix;
	antiadvert = conf.antiadvert;
	logs = conf.logs;
	//
	if (message.mentions.users.size == 1 && message.mentions.users.first() == client.user) {
		message.channel.send(`My prefix on \`${message.guild.name}\` is \`${prefix}\``)
		return;
	}
	if (antiadvert === `true`) {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		inviteRegex = /discord(?:app\.com|\.gg|\.me|\.io)(\/invite)?\/[^_\W]{5,32}/
		msg = await inviteRegex.test(message.content); {
			if (msg) {
				message.delete()
				message.reply('Advertising discord servers is prohibited.')
			}
		}
	}
}
	//
	args = message.content.split(' ');
	command = args.shift();
	switch(command) {
		case prefix + 'help':
			if (!args[0] || args[0] !== `config` && args[0] !== `antiadvert` && args[0] !== `logs`) {
				embed = new Discord.RichEmbed()
				.setDescription([
					`*Modules:*`,
					``,
					`\`${prefix}help\`: \`list of modules\``,
					`\`${prefix}help config\`: \`info on configuration\``,
					`\`${prefix}help antiadvert\`: \`info on anti advertisement\``,
					`\`${prefix}help logs\`: \`info on logging\``,
				])
				await message.channel.send(embed)
				return;
				}
			if (args[0] === `config`) {
				embed = new Discord.RichEmbed()
				.setDescription([
					`*Configuration:*`,
					``,
					`\`Permission\`: \`[MANAGE_GUILD]\``,
					`\`Description\`: \`set up your server\``,
				])
				await message.channel.send(embed)
				return;	
			}
			if (args[0] === `antiadvert`) {
				embed = new Discord.RichEmbed()
				.setDescription([
					`*Configuration:*`,
					``,
					`\`Usage\`: \`${prefix}config antiadvert [<boolean>]\``,
					`\`Description\`: \`enable/disable anti discord serv advertisement\``,
					`\`Bypass\`: \`[MANAGE_MESSAGES]\``,
				])
				await message.channel.send(embed)
				return;	
			}
			if (args[0] === `logs`) {
				embed = new Discord.RichEmbed()
				.setDescription([
					`*Configuration:*`,
					``,
					`\`Usage\`: \`${prefix}config logs [<channel>]\``,
					`\`Description\`: \`define your logs channel\``,
					`**LOGS:**`,
					`    • Message edits/deletions`,
					`    • Member/User edits (nicknames, usernames, roles)`,
					`    • Failed attempts to advertise`,
					`    • Leave/Join messages`
				])
				await message.channel.send(embed)
				return;	
			}
		break;
		//
		case prefix + 'config':
		case 'esc' + 'config':
			if (!message.member.hasPermission('MANAGE_GUILD')) {
				embed = new Discord.RichEmbed()
				.setDescription([
					`You are missing the permission \`[MANAGE_GUILD]\`.`,
				])
				await message.channel.send(embed)
				return;
				}
			if (!args[0] || (args[0] !== 'prefix' && args[0] !== 'antiadvert' && args[0] !== 'logs' && args[0] !== 'reset')) {
				embed = new Discord.RichEmbed()
					.setDescription([
						`*Configuration Values:*`,
						``,
						`(prefix) \`${prefix}\``,
						`(antiadvert) \`${antiadvert}\``,
						`(logs) \`#${logs.name}\``,
					])
					await message.channel.send(embed)
					return;
					}
			if (!args[1] && args[0] !== 'reset') {
				embed = new Discord.RichEmbed()
				.setDescription([
					`**USAGE:** \`${prefix}config [<value>] [<new value>]\``
				])
				await message.channel.send(embed)
				return;
			}
			if (args[0] === `prefix`) {
				client.settings.set(message.guild.id, args[1], 'prefix');
				conf = client.settings.ensure(message.guild.id, defaultS);
				prefix = conf.prefix;
				embed = new Discord.RichEmbed()
				.setDescription([
					``,
					`**Successfully updated the prefix to \`${prefix}\`**`,
					`*bypass this with \`escconfig\` incase of error*`
				])
				await message.channel.send(embed)
				break;
			}
			if (args[0] === `antiadvert`) {
				if (args[1] !== `true` && args[1] !== `false`) {
					embed = new Discord.RichEmbed()
					.setDescription([
						`**USAGE:** \`${prefix}config antiadvert [<boolean>]\``
					])
					await message.channel.send(embed)
					return;
				}
				client.settings.set(message.guild.id, args[1], 'antiadvert');
				conf = client.settings.ensure(message.guild.id, defaultS);
				antiadvert = conf.antiadvert;
				embed = new Discord.RichEmbed()
				.setDescription([
					``,
					`**Successfully updated ANTI-ADVERT to \`${antiadvert}\`**`,
					`*bypass this with \`escconfig\` incase of error*`
				])
				await message.channel.send(embed)
				break;
			}
			if (args[0] === `logs`) {
				logChannel = message.mentions.channels.first()
				if (!logChannel) logChannel = message.guild.channels.find(channel => channel.name === args[1])
				if (!logChannel) logChannel = message.guild.channels.get(args[1])
				if (!logChannel) {
					embed = new Discord.RichEmbed()
					.setDescription([
						`I couldn't find the channel '${args[1]}'`
					])
					await message.channel.send(embed)
					return;
				}
				if (logChannel.type !== 'text') {
					embed = new Discord.RichEmbed()
					.setDescription([
						`\`${logChannel.name}\` is not a text channel.`
					])
					await message.channel.send(embed)
					return;
				}
				client.settings.set(message.guild.id, logChannel, 'logs');
				conf = client.settings.ensure(message.guild.id, defaultS);
				logs = conf.logs;
				embed = new Discord.RichEmbed()
				.setDescription([
					``,
					`**Successfully updated logs channel to \`#${logs.name}\`**`,
					`*bypass this with \`escconfig\` incase of error*`
				])
				await message.channel.send(embed)
				break;
			}					
		if(args[0] === 'reset') {
			client.settings.delete(message.guild.id);
			await message.channel.send([
				`:tools: Successfully reset configuration for \`${message.guild.name}\`.`,
				`:exclamation: Default prefix is now \`!\``,
				`:speaking_head: Anti Advertisement has been disabled.`,
				`:wastebasket: Logging has been disabled.`
			])
			}
	}
});
//
 
client.login(config.token);
