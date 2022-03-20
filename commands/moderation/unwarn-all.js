const { Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name : 'unwarn-all',
    category : 'moderation',
    description : 'Unwarn a member of the server',
    permission: ['MANAGE_ROLES'],
    aliases: ['unwarn'],
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
        if(!memberMention) return message.reply('Veuillez mentionner une personne à unwarn !')

        const reasonUnwarn = args.slice(1).join(' ') || 'No Reason Provided...';

        if(
            message.member.roles.highest.position <= memberMention.roles.highest.position
        ) return message.reply('Vous ne pouver pas unwarn une personne ayant un rôle égal ou supérieur au vôtre !')

        memberMention.roles.remove("923684773476569128")
        memberMention.roles.remove("923684818301116436")
        memberMention.roles.remove("923684890992582686");
                    message.channel.send(`${message.author}, La personne suivante -> **${memberMention.user.tag}** a été unwarn pour la raison suivante: \n -> ***${reasonUnwarn}***`)

    }
}