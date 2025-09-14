// ===================== Imports =====================
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const WebSocket = require("ws");

// Local imports
const connectDB = require("./config/db");
const participantRoutes = require("./routes/participantRoutes");
const locationsRouter = require("./routes/locationRoutes");
const wardsRouter = require("./routes/wards");
const greenChampion = require("./routes/greenChampion");
const dashboardRouter = require("./routes/dashboard");
const communitiesRouter = require("./routes/communities");
const Location = require("./models/Location");

// ===================== Config =====================
dotenv.config();
const app = express();

// ===================== Middleware =====================
const allowedOrigins = [
  "https://econinjas.netlify.app", // deployed frontend
  "http://localhost:5173", // local frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== DB Connection =====================
connectDB();

// ===================== Routes =====================
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/location", locationsRouter);
app.use("/api/chatbot", require("./routes/chatbotRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", dashboardRouter);
app.use("/api/greenChampion", greenChampion);
app.use("/api/wards", wardsRouter);
app.use("/api/participants", participantRoutes);
app.use("/api/communities", communitiesRouter);
app.use("/api/locations", locationsRouter);

// ===================== WebSocket Setup =====================
function initWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("⚡ New WebSocket client connected");

    ws.on("message", async (message) => {
      try {
        const { lat, lng } = JSON.parse(message);
        if (lat === undefined || lng === undefined) return;

        // Upsert the single vehicle location in MongoDB
        await Location.findOneAndUpdate(
          {}, // always update the first document
          { lat, lng, updatedAt: new Date() },
          { upsert: true, new: true }
        );

        // Broadcast to all connected clients
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

// ===================== Start Server =====================
const server = http.createServer(app);
initWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server + WS running on port ${PORT}`);
});
