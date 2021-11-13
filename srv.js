const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

var matej
wss.on('connection', ws => {



    ws.on('message', message => {
        console.log("Recived msg: ", message.toString());
        
        if(!matej)
            matej = ws;

        matej.send(message.toString());
    });
})