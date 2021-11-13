const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })


let arduino;
let mobile = [];

wss.on('connection', ws => {

    ws.on('disconnect', () => {
        console.log("Web Socket Disconnected!")
    })

    ws.on('message', message => {
        console.log("Recived msg: ", message.toString());
        
        const msg = message.toString();  // register:arduino || command:on || status:ON

        const msgParts = msg.split(":");

        const method = msgParts[0];
        const payload = msgParts[1];


        if(method == 'register') {

            if(payload == 'arduino') {
                arduino = ws;
                console.log("Registered new arduino web socket.");
            }
            

            if(payload == 'mobile') {
                mobile.push(ws);
                console.log("Registered new mobile device");
            }
        
        }

        if(method == 'command') {

            arduino.send(payload);

        }

        if(method == 'status') {
            for(let mob of mobile) {
                mob.send(payload);
            }
        }



    });


})