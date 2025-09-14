const express = require("express")
const http = require("http");
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const participantRoutes = require("./routes/participantRoutes");
const { initWebSocket } = require("./websocket");
const locationsRouter = require("./routes/locationRoutes");

// Local imports
const wardsRouter = require("./routes/wards");
const greenChampion = require("./routes/greenChampion");
const dashboardRouter = require("./routes/dashboard");
const communitiesRouter = require("./routes/communities")

// ===================== Config =====================
dotenv.config()
const app = express()

// Middleware


const allowedOrigins = [
  "https://econinjas.netlify.app", // deployed frontend
  "http://localhost:5173"           // local frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman) or from allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you use cookies/auth headers
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// DB Connection
connectDB()

// Routes
app.use("/api/complaints", require("./routes/complaintRoutes"))
app.use("/api/location", require("./routes/locationRoutes"))
app.use("/api/chatbot", require("./routes/chatbotRoutes"))
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", dashboardRouter);
app.use("/api/greenChampion", greenChampion);
app.use("/api/wards", wardsRouter);
app.use("/api/participants", participantRoutes);
app.use("/api/communities", communitiesRouter);
app.use("/api/locations", require("./routes/locationRoutes"));
app.use("/api/locations", locationsRouter);

const server = http.createServer(app);
initWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server + WS running on port ${PORT}`));
