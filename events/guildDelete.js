module.exports = (client, guild) => {
    console.log(`\n${guild.name}(${guild.id}) removed me from their server.\n`);
    client.settings.delete(guild.id);
};
