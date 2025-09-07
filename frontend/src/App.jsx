// src/App.jsx
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Send, Trash2, Bot, User, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Your components & pages
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
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
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
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Speech recognition
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

  // Dark mode
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  // Chatbot functions
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
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.answer, timestamp: new Date() },
        ]);
      }, 1000);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Server not responding...",
          timestamp: new Date(),
        },
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
  const startListening = () =>
    recognitionRef.current &&
    (setIsListening(true), recognitionRef.current.start());
  const stopListening = () =>
    recognitionRef.current &&
    (setIsListening(false), recognitionRef.current.stop());

  return (
    <Router>
      <ProgressProvider>
        <Sidebar />
        <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
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
        </main>

        {/* Floating Chatbot */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
          {/* Floating button */}
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-green-600 text-white p-6 rounded-full shadow-lg hover:scale-105 transition-transform text-3xl"
            >
              💬
            </button>
          )}

          {/* Chat window */}
          {isChatOpen && (
            <div className="w-96 h-[550px] bg-white shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-gray-300">
              {/* Header */}
              <div className="flex justify-between items-center p-4 bg-green-600 text-white font-bold text-lg">
                <span>WasteBot</span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-base">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-gray-500">WasteBot is typing...</div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-300 flex items-center gap-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  {isListening ? <MicOff /> : <Mic />}
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-2xl border border-gray-300 resize-none text-base"
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 text-white px-5 py-2 rounded-2xl font-semibold hover:bg-green-700"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </ProgressProvider>
    </Router>
  );
}
