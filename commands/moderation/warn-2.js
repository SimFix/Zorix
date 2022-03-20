const { Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name : 'warn-2',
    category : 'moderation',
    description : 'Warn a member of the server',
    permission: ['MANAGE_ROLES'],
    aliases: ['w-2'],
    usage: '<user>',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        
        if(!message.member.permissions.has('ADMINISTRATOR')) return;

        message.delete();

        const memberMention = message.mentions.members.first()
        if(!memberMention) return message.reply('Membre invalide')

        const reasonWarn = args.slice(1).join(' ') || 'Pas de raison...';

        if(
            message.member.roles.highest.position <= memberMention.roles.highest.position
        ) return message.reply('Vous ne pouver pas warn une personne ayant un rôle égal ou supérieur au vôtre !')

        memberMention.roles.remove('923684773476569128')
        memberMention.roles.add("923684818301116436");
            message.channel.send(`${message.author}, La personne suivante -> **${memberMention.user.tag}** a été warn pour la raison suivante: \n -> ***${reasonWarn}***`)
    }
}