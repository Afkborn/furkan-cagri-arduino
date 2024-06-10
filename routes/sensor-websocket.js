const getTimeForLog = require("../common/time");

// WebSocket bağlantılarını tutacak dizi
let wsClients = [];

// WebSocket Server'ın bağlantı olayı
function handleWebSocketConnection(ws) {
  console.log(getTimeForLog() + "New WebSocket connection");
  wsClients.push(ws);

  ws.on("close", () => {
    console.log(getTimeForLog() + "WebSocket connection closed");
    wsClients = wsClients.filter((client) => client !== ws);
  });
}

function sendJsonObjectToAllClients(message) {
  wsClients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
  console.log(
    getTimeForLog() + "Message sent to WebSocket clients, type: " + message.type
  );
}

module.exports = {
  wsClients,
  handleWebSocketConnection,
  sendJsonObjectToAllClients,
};
