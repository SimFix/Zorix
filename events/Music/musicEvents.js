const client = require('../../index.js')
const { MessageEmbed } = require('discord.js')


const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor('#0085ec')
    .setTitle('🎵 Playing')
    .setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)]}
    ))
    
    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor('#0085ec')
        .setTitle('🎵 Added Song')
        .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]}
    ))
    
    .on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor('#0085ec')
        .setTitle('🎵 Song List')
        .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)]}
        ))
    
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send({embeds: [new MessageEmbed()
        .setColor('#0085ec')
        .setTitle('Searching Canceled!')
        .setDescription('Searching Canceled! Recherche interrompue pour aucune raison spécifique...')
        .setTimestamp()
        .setFooter({text: 'Music | SimBot'})
    ]}))
    
    .on("error", (channel, e) => {
        channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`)
        console.error(e)
    })
    
    .on("empty", queue => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor('#0085ec')
        .setTitle('Empty Channel')
        .setDescription('Empty Channel! Je ne vous vois pas connecté dans un vocal... Veuillez vous connecter dans un vocal pour pouvoir écouter de la musique.')
        .setTimestamp()
        .setFooter({text: 'Music | SimBot'})
    ]}))
    
    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed()
        .setColor('#0085ec')
        .setTitle('No Results!')
        .setDescription('No Results! Je ne trouve pas de résultats pour cette musique...')
        .setTimestamp()
        .setFooter({text: 'Music | SimBot'})
    ]}))
    
    .on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
        .setColor('#0085ec')
        .setTitle('Finish!')
        .setDescription('Finished! Si tu veux réécouter de la musique, je t\'invite à faire **/music play** !')
        .setTimestamp()
        .setFooter({text: 'Music | SimBot'})
    ]}))

module.exports = {
    name: 'musicSystem'
}

