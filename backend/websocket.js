const WebSocket = require("ws");
const Location = require("./models/Location");

let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("⚡ New WebSocket client connected");

    ws.on("message", async (message) => {
      try {
        const { lat, lng } = JSON.parse(message);
        if (lat === undefined || lng === undefined) return;

        // Save location to DB
        await Location.create({ lat, lng });

        console.log("Sending coords to client:", lat, lng);

        // Broadcast to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ lat, lng }));
          }
        });
      } catch (err) {
        console.error("Invalid WS message:", err.message);
      }
    });

    ws.on("close", () => console.log("❌ WebSocket client disconnected"));
  });

  console.log("✅ WebSocket server initialized at /ws");
}

module.exports = { initWebSocket };
