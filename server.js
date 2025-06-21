const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  ws.on('message', function incoming(message) {
    try {
      const json = JSON.parse(message);
      console.log('Received JSON:', json);
    } catch (e) {
      console.log('Received non-JSON:', message);
    }
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

// Serve static dashboard
app.use(express.static('dashboard'));

server.listen(443, () => {
  console.log('Server running on http://wordcount-ynnd.onrender.com');
});
