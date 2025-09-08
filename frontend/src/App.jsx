// src/App.jsx
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Send,
  Trash2,
  Bot,
  User,
  Mic,
  MicOff,
  Download,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Components & Pages
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Complaints from "./pages/Complaints";
import Map from "./pages/Map";
import Modules from "./pages/Modules";
import VideoPage from "./pages/VideoPage";
import ContentPage from "./pages/ContentPage";
import QuizPage from "./pages/QuizPage";
import ActivityPage from "./pages/ActivityPage";
import PledgePage from "./pages/PledgePage";
import FinalQuizPage from "./pages/FinalQuizPage";
import CertificationPage from "./pages/CertificationPage";
import BuySell from "./pages/BuySell";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import CommunityPage from "./pages/CommunityPage";
import Communities from "./pages/Communities";
import Tracking from "./pages/Tracking";

import { ProgressProvider } from "./context/ProgressContent";

export default function App() {
  // WasteBot states
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🤖 Hi! Main tumhara Waste Management Assistant hoon. Mujhse kuch bhi poochho!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat toggle
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Speech recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((r) => r[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // Scroll to bottom
  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  // Speech recognition controls
  const startListening = () =>
    recognitionRef.current && (setIsListening(true), recognitionRef.current.start());
  const stopListening = () =>
    recognitionRef.current && (setIsListening(false), recognitionRef.current.stop());

  // Chat functions
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setTimeout(() => {
        setIsTyping(false);
        const botMessage = { sender: "bot", text: data.answer, timestamp: new Date() };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server not responding...", timestamp: new Date() },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () =>
    setMessages([
      {
        sender: "bot",
        text: "🤖 Hi! Main tumhara Waste Management Assistant hoon. Mujhse kuch bhi poochho!",
        timestamp: new Date(),
      },
    ]);

  const exportChat = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wastebot-chat.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChat = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        setMessages(JSON.parse(evt.target.result));
      } catch {
        console.error("Error parsing chat file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Router>
      <ProgressProvider>
        <Sidebar />
        <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/buyandsell" element={<BuySell />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityPage />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/map" element={<Map />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/video/:moduleId" element={<VideoPage />} />
            <Route path="/content/:moduleId" element={<ContentPage />} />
            <Route path="/quiz/:moduleId" element={<QuizPage />} />
            <Route path="/activity/:moduleId" element={<ActivityPage />} />
            <Route path="/pledge/:moduleId" element={<PledgePage />} />
            <Route path="/quiz/final" element={<FinalQuizPage />} />
            <Route path="/certificate" element={<CertificationPage />} />
            <Route
              path="*"
              element={
                <div className="p-6 text-center">
                  <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>

          {/* WasteBot Chat */}
          <div className="fixed bottom-4 right-4 z-50">
            {!isChatOpen && (
              <button
                onClick={() => setIsChatOpen(true)}
                className="p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
                title="Open WasteBot"
              >
                💬 WasteBot
              </button>
            )}

            {isChatOpen && (
              <div
                className={`flex flex-col h-[500px] w-96 max-w-full rounded-xl shadow-lg overflow-hidden border ${
                  isDarkMode ? "bg-gray-800/80 border-gray-600" : "bg-white/90 border-gray-300"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold">
                  <div className="flex items-center gap-2">
                    <Bot /> WasteBot Assistant
                  </div>
                  <div className="flex gap-1">
                    <button onClick={clearChat} title="Clear Chat">
                      <Trash2 />
                    </button>
                    <button onClick={exportChat} title="Export Chat">
                      <Download />
                    </button>
                    <label title="Import Chat">
                      <Upload />
                      <input
                        type="file"
                        accept=".json"
                        onChange={importChat}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      title="Toggle Theme"
                    >
                      {isDarkMode ? "🌙" : "☀️"}
                    </button>
                    <button onClick={() => setIsChatOpen(false)} title="Close Chat">
                      ❌
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-2 overflow-y-auto space-y-2">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg max-w-[75%] ${
                            msg.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && <div>Bot is typing...</div>}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-2 flex gap-2 border-t">
                  <button onClick={isListening ? stopListening : startListening}>
                    {isListening ? <MicOff /> : <Mic />}
                  </button>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question..."
                    className="flex-1 rounded-md p-2 border"
                  />
                  <button onClick={sendMessage}>
                    <Send />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </ProgressProvider>
    </Router>
  );
}
