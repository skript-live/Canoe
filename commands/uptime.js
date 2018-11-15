const ms = require('ms');

module.exports.run = (client, message, args) => {
	message.channel.send(`**UPTIME:** \`${ms(client.uptime)}\``)
};
