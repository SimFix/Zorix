const {
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    MessageEmbed
} = require('discord.js')
const client = require('../../index')

client.on("interactionCreate", async (interaction) => {

   
    if (interaction.isButton()) {
        if (interaction.customId === 'tic') {

            const nwChnl = await interaction.guild.channels.create(`${interaction.member.user.tag}`, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [
                    {
                        id: interaction.member.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]
          });
            const embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('\n Le personnel sera là dès que possible, alors parlez-nous de votre problème !\n Merci !')
                .setColor('GREEN')
                .setImage("https://media.giphy.com/media/yolRo1Jo699AQAwLJ8/giphy.gif")
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                }));

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('del')
                    .setLabel('🗑️ fermer le ticket !')
                    .setStyle('DANGER'),
                );
            interaction.user.send('Ticket ouvert avec succès !');
            nwChnl.send({
                content: `Salut <@${interaction.user.id}>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.reply({
                content: 'ticket ouvert !',
                ephemeral: true
            }))
            console.log(`Created tichet channel: ${nwChnl.name}`);
        } else if (interaction.customId === 'del') {

            interaction.reply(
                {
                    embeds: [
                        new MessageEmbed()
                            .setColor('#0085ec')
                            .setDescription(`Ce ticket sera supprimé dans 5 secondes!`)
                    ]
                }
            )

            setTimeout(() => {
                interaction.channel.delete();
            }, 5000)


        }
    }
})