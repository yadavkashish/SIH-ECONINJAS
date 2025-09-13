const WebSocket = require("ws");
const Location = require("./models/Location");

let wss;

const initWebSocket = (server) => {
  wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("🔌 Client connected (ESP32 or Frontend)");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.lat && data.lng) {
          const location = new Location({ lat: data.lat, lng: data.lng });
          await location.save();

          console.log("📍 Received & saved:", data);

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        }
      } catch (err) {
        console.error("⚠️ Invalid message:", message);
      }
    });

    ws.on("close", () => console.log("❌ Client disconnected"));
  });
};

module.exports = { initWebSocket };