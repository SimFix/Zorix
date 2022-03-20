const { Client, Message, MessageEmbed } = require('discord.js');


module.exports = {
    name : 'clear',
    aliases : ['purge', 'c'],
    permission: ['MANAGE_MESSAGES'],
    usage: '<number> ou <user>',
    example: '3 ou @SimFix ;)',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    
    run : async(client, message, args) => {
        
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return;

        const member = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if(member) {

            if(!message.member.permissions.has('MANAGE_MESSAGES')) return;

            message.delete();

            const userMessages = (await messages).filter((m) => m.author.id === member.id);
            await message.channel.bulkDelete(userMessages);
                message.channel.send(`Les messages de ${member} ont été supprimés avec succès !`).then
                    (setTimeout(() => {
                        message.channel.bulkDelete(1)
                    }, 5000));

        } else {

            if(!message.member.permissions.has('MANAGE_MESSAGES')) return;
            
            message.delete();

            if(!args[0]) 
                return message.channel.send(
                    'Veuillez spécifier un nombre de messages à supprimer entre 1 et 99 !'
                ).then
                    (setTimeout(() => {
                        message.channel.bulkDelete(1)
                    }, 5000));
        
        
            if(isNaN(args[0])) 
                return message.channel.send(
                    'Veuillez spécifier un nombre valide'
                ).then
                    (setTimeout(() => {
                        message.channel.bulkDelete(1)
                    }, 5000));
        
            if(parseInt(args[0]) > 99) 
                return message.channel.send(
                    'Je ne peux pas supprimer plus de 99 messages !'
                ).then
                    (setTimeout(() => {
                        message.channel.bulkDelete(1)
                    }, 5000));
        
            await message.channel.bulkDelete(parseInt(args[0]))
                .catch(err => console.log(err))
                    message.channel.send(
                        '**' + args[0] + '**' + " Messages supprimés avec succès !"
                    ).then
                        (setTimeout(() => {
                            message.channel.bulkDelete(1)
                        }, 5000));
        }
    },
}