const client = require('../../index.js')

client.on('ready', () => {
    client.user.setActivity('-_Zorix-_#2222', {
        type: 'LISTENING'
    })

    console.log('Je Suis Prêt!')
});