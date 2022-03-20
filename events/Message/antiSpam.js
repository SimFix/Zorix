const { Message, MessageEmbed } = require('discord.js');
const client = require('../../index')
const map = new Map();

/**
* @param {Message} message 
*/
client.on('messageCreate', async(message) => {
    if(message.author.bot) return;

        const role = message.guild.roles.cache.get('905970721782640651');
    
        if(map.has(message.author.id)){
            const uData = map.get(message.author.id);
            const { lastMessage, timer } = uData;
            const diff = message.createdTimestamp - lastMessage.createdTimestamp; 
            let mCount = uData.msgCount
            if(diff > 2500){
                clearTimeout(timer);
                uData.msgCount = 1;
                uData.lastMessage = message;
                uData.timer = setTimeout(() => {
                    map.delete(message.author.id);
                }, 5000)
                map.set(message.author.id, uData);
            } else {
                ++mCount;
                if(parseInt(mCount) === 5){
                    if(message.member.roles.cache.has(role)) return;
                    message.member.roles.add(role);
                    message.channel.send({embeds: [
                        new MessageEmbed()
                        .setColor('#0085ec')
                        .setDescription(`${message.member} Vous avez été mute en raison d'un spam dans ce channel.`)
                    ]})
                } else {
                    uData.msgCount = mCount;
                    map.set(message.author.id, uData);
                }
            }
                
        } else {
            let fn = setTimeout(() => {
                map.delete(message.author.id);
            }, 5000)
            
            map.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            });
                
        }  
    
});

module.exports = {
    name: 'antiSpam'
}