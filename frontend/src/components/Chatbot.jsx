import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Trash2, Bot, Mic, MicOff, Download, Upload } from "lucide-react";

export default function Chatbot() {
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (e) =>
        setInput(Array.from(e.results).map((r) => r[0].transcript).join(""));
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // Scroll to bottom
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const startListening = () => recognitionRef.current && (setIsListening(true), recognitionRef.current.start());
  const stopListening = () => recognitionRef.current && (setIsListening(false), recognitionRef.current.stop());

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
        setMessages((prev) => [...prev, { sender: "bot", text: data.answer, timestamp: new Date() }]);
      }, 800);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Server not responding...", timestamp: new Date() }]);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const clearChat = () => setMessages([{ sender: "bot", text: "🤖 Hi! Main tumhara Waste Management Assistant hoon. Mujhse kuch bhi poochho!", timestamp: new Date() }]);

  const exportChat = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "wastebot-chat.json"; a.click(); URL.revokeObjectURL(a.href);
  };

  const importChat = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => { try { setMessages(JSON.parse(evt.target.result)); } catch { console.error("Invalid chat file"); } };
    reader.readAsText(file);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Open WasteBot"
        >
          💬
        </button>
      )}

      {isChatOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="flex flex-col h-[500px] w-96 max-w-full rounded-xl shadow-2xl overflow-hidden border bg-white border-gray-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-green-600 text-white font-semibold rounded-t-xl">
            <div className="flex items-center gap-2"><Bot /> WasteBot</div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} title="Clear Chat"><Trash2 /></button>
              <button onClick={exportChat} title="Export Chat"><Download /></button>
              <label className="cursor-pointer" title="Import Chat">
                <Upload />
                <input type="file" accept=".json" onChange={importChat} className="hidden" />
              </label>
              <button onClick={() => setIsChatOpen(false)}>❌</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-2 rounded-xl max-w-[75%] break-words ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}>
                    {msg.text}
                    <div className="text-xs mt-1 text-gray-400 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && <div className="text-gray-500 italic">WasteBot is typing...</div>}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t bg-white">
            <button onClick={isListening ? stopListening : startListening} className="text-gray-600">
              {isListening ? <MicOff /> : <Mic />}
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button onClick={sendMessage} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
              <Send />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
