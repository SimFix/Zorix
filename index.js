const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({
  intents: Object.keys(Intents.FLAGS)
});


const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
client.distube = new DisTube(client, {
    leaveOnStop: true,
    leaveOnFinish: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new SoundCloudPlugin(),
      new YtDlpPlugin()
    ],
    youtubeDL: false
})

module.exports = client;
require("./handler")(client);
client.config = require("./config.json");
client.commands = new Collection();
client.slashCommands = new Collection();
const prefix = client.config.prefix

client.on("messageCreate", message => {
    if(
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    ) return


    //!Ticket
    if(message.content === prefix + "Ticket"){

      const Ticket = new MessageEmbed()
          .setTitle('POUR TROUVER LE CHANNEL PLUS RAPIDEMENT')
          .addField("Transfere des données du salon en cours...  ","<#845314095867232337>")
          .setColor('RANDOM')
          .setFooter('Voici le channel pour acceder aux tickets');

          message.channel.send({ embeds: [Ticket]});
    }

  //!Staff ( cette commande n'est pas programée pour eviter de la spam elle le sera plus tard.)
  if(message.content === prefix + "Staff"){

      const Staff = new MessageEmbed()
          .setTitle('ADMINISTRATION')
          .addField("Appelle en cours... ","<@&908717394728464384> ( si aucune personne ne répond merci d'ouvrir un ticket) ")
          .setColor('RANDOM')
          .setFooter('un administateur a été ping merci de patienter');

      message.channel.send({ embeds: [Staff]});
  }
   //!Liens du bot
   if(message.content === prefix + "LDB"){

    const LDB  = new MessageEmbed()
        .setTitle('Pour ajouter le bot a votre serveur')
        .addField("Transfere du liens en cours... ","https://discord.com/api/oauth2/authorize?client_id=905974180179214417&permissions=8&scope=bot%20applications.commands")
        .setColor('RANDOM')
        .setFooter('dev by Zorix');

        message.channel.send({ embeds: [LDB]});
  }

  //Invitation
  if(message.content === prefix + "Invitation"){

    const Invitation = new MessageEmbed()
      .setTitle('Liens du discord BLK')
      .addField("Transfere du liens...","https://discord.gg/cFbgM5vzRT")
      .setColor('RANDOM')
      .setFooter('Le liens dure une semaine');

    message.channel.send({ embeds: [Invitation]});
  }

  //!Help
  if(message.content === prefix + "Help"){

    const Help = new MessageEmbed()
        .setTitle('Commandes du bot discord')
        .addField("+Prefix","Cette commande prermet d'avoir le prefix du bot")
        .addField("+ticket-panel","Cette commande permet d'ourir un ticket")
        .addField("+LDB","Cette commande permet d'avoir le liens du bot")
        .addField("+Ticket","Cette commande permet de trouver le channel ticket plus rapidement")
        .addField("+Staff","Cette commande permet de ping un administrateur sans pour autant faire un ticket")
        .addField("+Invitation","Permet d'avoir une  invitation pour le serveur BLK d'une durée d'une semaine")
        .addField("+Help","Cette commande permet de voir les commandes disponnibles pour les citoyens")
        .addField("+Youtube","Cette commande permet d'avoir le liens de la chaine youtube de BLK")
        .addField("+Topserv","Cette commande permet de voter sur le top serveur")
        .addField("/music","Cette commande permet d'avoir de la musique dans n'importe quel channel !")
        .addField("+Hostbot","Cette commande permet de savoir qui mp pour le bot discord Douanier")
        .setColor('RANDOM')
        .setFooter({text: 'le bot est en plein dev'})

    message.channel.send({ embeds: [Help]});
  }

  //+connect
    if(message.content === prefix + "Connect"){

      const Connect = new MessageEmbed()
          .setTitle('POUR TROUVER LE SERVEUR PLUS RAPIDEMENT')
          .addField("Transfere des connect en cours...  ","entrer l'ip connect du serveur ")
          .setColor('RANDOM')
          .setFooter('Voici le connect')
          .setImage('https://imgur.com/31qW8jq.jpg')

          message.channel.send({ embeds: [Connect]});
    }



   //+Ticket
   if(message.content === prefix + "Ticket"){

    const Ticket = new MessageEmbed()
        .setTitle('POUR TROUVER LE SITE PLUS RAPIDEMENT')
        .addField("Transfere des données du channel en cours...  ","entrer le channel .")
        .setColor('RANDOM')
        .setFooter('Voici le channel')
        .setImage('https://imgur.com/vbQ3d74.jpg')

        message.channel.send({ embeds: [Ticket]});
  }  


   //+Top serveur
   if(message.content === prefix + "Top Serveur"){

    const Tps = new MessageEmbed()
        .setTitle('POUR TROUVER LE SITE PLUS RAPIDEMENT')
        .addField("Transfere des données du site en cours...  ","https://www.snipes.fr/")
        .setColor('RANDOM')
        .setFooter('Voici le site officiel de Snipes')
        .setImage('https://imgur.com/eJOSB8N.jpg')

        message.channel.send({ embeds: [Snipes]})
  }  
  
     //+Hostbot
     if(message.content === prefix + "Hostbot"){

      const Hostbot = new MessageEmbed()
          .setTitle('Personne à mp pour le bot')
          .addField("Cette personne est...","<@&921542503478480936>")
          .setFooter('Merci de ne pas MP les personnes non concernées')
          .setColor('RANDOM')
          
  
      message.channel.send({ embeds: [Hostbot]});
    }

  //+Prefix
  if(message.content === prefix + "Prefix"){

    const Youtube = new MessageEmbed()
        .setTitle('Prefix du bot discord zorix')
        .addField("Télechargement des données du bot...","le Prefix est **+**")
        .setColor('RANDOM')
        .setFooter('Dev by Zorix')

    message.channel.send({ embeds: [Youtube]});
  }

  
   //+Règlement
   if(message.content === prefix + 'Règlement'){

       message.delete()

       const Règlement = new MessageEmbed()
        .setTitle('🔴 Règlement Rewind')
        .addField("__Règlement:__","**Merci de prendre concience de ce règlement, en cas de non respect de ce règlement, des sanctions vont tomber sans avertissement.**")
        .setImage("https://media.giphy.com/media/tuEeAvp3F8Kgrf925w/giphy.gif")
        .setColor('RANDOM')
        .setFooter('Merci de le lire attentivement')
       const Buttons = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel('📜 Règlement')
	    .setURL('')
            .setStyle('LINK')
       )

       message.channel.send({embeds: [Règlement], components: [Buttons]})
   }
});

client.on("messageCreate", message => {
  if(message.author.bot) return;

  if(message.content === prefix + 'Collect'){

    message.delete()

    const Collect = new MessageEmbed()
     .setTitle('🔮 Collection demon slayer Rewind ')
     .addField("__Collection:__","**Merci d'installer cette collection pour ne rencontrer aucun problème en jeux .**")
     .setImage("")
     .setColor('RANDOM')
     .setFooter('Bon jeux')
    const Buttons = new MessageActionRow().addComponents(
     new MessageButton()
         .setLabel('🎮 Collection')
   .setURL('https://steamcommunity.com/sharedfiles/filedetails/?id=2755314847')
         .setStyle('LINK')
    )

    message.channel.send({embeds: [Collect], components: [Buttons]})
}

})


client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get("943925810501414935")
  if (!channel) return;
  channel.send(`<a:Love:924319341212745788> ${member.displayName} nous a rejoint ! <a:Love:924319341212745788>`)
  
  //autorole
  member.roles.add('845203663999467571')
})

client.login(client.config.token)

