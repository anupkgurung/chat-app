const websocket = require('ws');
const http = require('http');
const expres = require('express');

const app = expres();

const server = http.createServer(app);
const ws = new websocket.Server({ server });

const clients = new Set();

ws.on('connection', function (ws) {
    clients.add(ws);

    ws.on('message', function (msg) {
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg)
            }
        }
    });

    ws.on('close', function () {
        clients.delete(ws);
    })
})

app.use(expres.static('public'));

const PORT = 3000;
server.listen(PORT, () => {
    console.log("server running at 3000");
})