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

  ws.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast to all dashboards
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

// Serve static dashboard
app.use(express.static('dashboard'));

server.listen(443, () => {
  console.log('Server running on http://localhost:443');
});
