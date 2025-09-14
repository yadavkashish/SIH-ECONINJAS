const WebSocket = require("ws");
const Location = require("./models/Location");

let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("⚡ New WebSocket client connected");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        const { deviceId, lat, lng } = data;

        if (!deviceId || lat === undefined || lng === undefined) return;

        await Location.findOneAndUpdate(
          { deviceId },
          { lat, lng, updatedAt: new Date() },
          { upsert: true, new: true }
        );

        // Broadcast to all connected frontend clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ deviceId, lat, lng }));
          }
        });
      } catch (err) {
        console.error("Invalid WS message:", err.message);
      }
    });
  });

  console.log("✅ WebSocket server initialized at /ws");
}

module.exports = { initWebSocket };
