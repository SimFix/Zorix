const { CommandInteraction, MessageEmbed, Client, Message } = require('discord.js')

module.exports = {
    name: 'music',
    description: 'Complete music system',
    options: [
        {
            name: 'play', description: 'Jouer une musique', type: 'SUB_COMMAND',
            options: [{name: 'query', description: 'Donnez un nom ou un lien pour la chanson', type: 'STRING', required: true}]
        },
        {
            name: 'volume', description: 'Changer le volume', type: 'SUB_COMMAND',
            options: [{name: 'percent', description: '10 = 10%', type: 'NUMBER', required: true}]
        },
        {
            name: 'settings', description: 'Choisir une option', type: 'SUB_COMMAND',
            options: [{name: 'options', description: 'Choisir une option', type: 'STRING', required: true,
            choices: [
                {name: '🔢 Regarder la d attente', value: 'queue'},
                {name: '⏭ Changer la musique', value: 'skip'},
                {name: '⏸ Mettre en pause la musique', value: 'pause'},
                {name: '⏯ Mettre la file d attente', value: 'resume'},
                {name: '⏹ Arreter la musique', value: 'stop'},
                {name: '🔀 Mélanger la file', value: 'shuffle'},
                {name: '🔄 Autoplay Mode', value: 'AutoPlay'},
                {name: '🈁 Ajouter une musique a la file', value: 'RelatedSong'},
                {name: '🔁 Mode de répétition', value: 'RepeatMode'}
            ]}]
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        await interaction.deferReply();

        if(!VoiceChannel)
        return interaction.editReply({ content: 'Vous devez être dans un vocal pour pouvoir utiliser cette commande !', ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.editReply({ content: `Je suis déjà en train de jouer de la musique dans un vocal !`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case 'play': {
                    client.distube.play( VoiceChannel, options.getString('query'), { textChannel: channel, member: member });
                    interaction.editReply({ content: '🎶 Musique ajoutée !'});
                }
                break;
                case 'volume': {
                    const Volume = options.getNumber('percent')
                    if(Volume > 100 || Volume < 1)
                    return interaction.editReply({ content: 'Veuillez spécifier un nombre entre 1 et 100'});

                    client.distube.setVolume(VoiceChannel, Volume);
                    interaction.editReply({content: `🔊 Le volume a été mit à **${Volume}%**`});
                }
                break;
                case 'settings': {
                    const queue = await client.distube.getQueue(VoiceChannel)

                    if(!queue)
                    return interaction.editReply({ content: ':x: Aucune file d attente disponible'})

                    switch(options.getString('options')) {
                        case 'skip' : {
                            await queue.skip(VoiceChannel);
                            interaction.editReply({content: '⏭ La musique a été changée !'})
                        } break;

                        case 'stop': {
                            await queue.stop(VoiceChannel);
                            interaction.editReply({content: '⏹ La chanson s\'est arrêtée !'})
                        } break;

                        case 'pause': {
                            await queue.pause(VoiceChannel);
                            interaction.editReply({content: '⏸ Chanson mise en pause !'})
                        } break;

                        case 'resume': {
                            await queue.resume(VoiceChannel);
                            interaction.editReply({content: '⏯ Reprise de la chanson !'})
                        } break;

                        case 'shuffle': {
                            await queue.shuffle(VoiceChannel);
                            interaction.editReply({content: '🔀 File d\'attente mélangée !'})
                        } break;

                        case 'AutoPlay': {
                            let AUMode = await queue.toggleAutoplay(VoiceChannel);
                            interaction.editReply({content: `🔄 Mode AutoPlay réglé sur: *${AUMode ? "On" : "Off"}*`})
                        } break;

                        case 'RelatedSong': {
                            await queue.addRelatedSong(VoiceChannel);
                            interaction.editReply({content: '🈁 Chanson associée ajoutée à la file d\'attente !'})
                        } break;

                        case 'RepeatMode': {
                            let RPMode = await client.distube.setRepeatMode(queue)
                            interaction.editReply({content: `🔁 Repeat Mode set to: *${RPMode == RPMode ? RPMode == 2 ? "Queue" : "Song" : "Off"}*`})
                        } break;

                        case 'queue': {
                            const q = queue.songs
                            .map((song, i) => `**${i === 0 ? 'Playing:' : `**${i}**.`}** *${song.name}* - \`${song.formattedDuration}\``)
                            .join('\n')
    
                            const embed = new MessageEmbed()
                            .setColor('#0085ec')
                            .setTitle('Song Queue')
                            .setDescription(
                                q.substr(0, 4096)
                            )
    
                            interaction.editReply({embeds: [embed]})
                        } break;
                    }
                }
                break;
            }
        } catch(e) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ff00ec')
                .setTitle(':x: ERROR')
                .setDescription(`${e}`)
            return interaction.editReply({ embeds: [errorEmbed]})
        }
    }
}