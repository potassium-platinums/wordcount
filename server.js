const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 443 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    try {
      const json = JSON.parse(message);
      console.log('Received JSON:', json);
    } catch (e) {
      console.log('Received non-JSON:', message);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on https://wordcount-ynnd.onrender.com');
