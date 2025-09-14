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

        // Always update the single vehicle document
        await Location.findOneAndUpdate(
          { deviceId: "vehicle-1" },
          { lat, lng, updatedAt: new Date() },
          { upsert: true, new: true }
        );

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
  });

  console.log("✅ WebSocket server initialized at /ws");
}

module.exports = { initWebSocket };
