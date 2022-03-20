const client = require("../../index");
const { MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js')

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
    
    if(!message.member.permissions.has(command.permission || [])) return (await message.channel.send(`${message.author}, Vous n'avez pas la permission d'utiliser cette commande.`));
    if(!message.guild.me.permissions.has(command.botPermission || [])) return (await message.channel.send(`Je n'ai pas la permission d'utiliser cette commande.`));

    
});