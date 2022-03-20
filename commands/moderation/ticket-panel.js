const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');


module.exports = {
    name: 'ticket-panel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
            
            .setDescription(
                "__**Comment faire un ticket**__\n" +


                "> Cliquez sur la réaction pour ouvrir un ticket\n" +

                "> Une fois que le ticket est ouvert , vous pourrez y entrer votre problème ou autre"

            )
            .setImage("https://media.giphy.com/media/k0NKismFEZOCvafdqV/giphy.gif")
            .setTitle('Tickets')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🛠️ ouvrir un ticket !')
                .setStyle('PRIMARY'),
            );

        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    }
}