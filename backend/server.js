const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const participantRoutes = require("./routes/participantRoutes");

dotenv.config()
const app = express()

// Middleware
app.use(cors())
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
