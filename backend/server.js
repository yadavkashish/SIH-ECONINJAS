const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const participantRoutes = require("./routes/participantRoutes");

dotenv.config()
const app = express()

// Middleware
const cors = require("cors");

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
app.use("/api/participants", participantRoutes);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
