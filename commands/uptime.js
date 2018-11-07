module.exports.run = (client, message, args) => {
    totalSeconds = (client.uptime / 1000);
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    message.channel.send(`**UPTIME:** \`${hours} hours\`, \`${minutes} minutes\` and \`${Math.round(seconds)} seconds\``)
};
