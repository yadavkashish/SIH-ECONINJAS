import { useState, useRef, useEffect } from "react";
import { Send, Trash2, Bot, User, Mic, MicOff, Download, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "🤖 Hi! Main tumhara Waste Management Assistant hoon. Mujhse kuch bhi poochho!",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition if available
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      sender: "user", 
      text: input,
      timestamp: new Date()
    };
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
        const botMessage = { 
          sender: "bot", 
          text: data.answer,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "⚠️ Server not responding...",
          timestamp: new Date()
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

  const clearChat = () => {
    setMessages([
      { 
        sender: "bot", 
        text: "🤖 Hi! Main tumhara Waste Management Assistant hoon. Mujhse kuch bhi poochho!",
        timestamp: new Date()
      }
    ]);
  };

  const exportChat = () => {
    const chatData = JSON.stringify(messages, null, 2);
    const blob = new Blob([chatData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wastebot-chat.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChat = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedMessages = JSON.parse(event.target.result);
          setMessages(importedMessages);
        } catch (error) {
          console.error("Error parsing chat file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 animate-gradient-x'}`}>
      <motion.div
        className={`relative w-full max-w-2xl h-[85vh] backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${isDarkMode ? 'bg-gray-800/70 border-gray-600' : 'bg-white/20 border-white/30'}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold shadow-md ${isDarkMode ? 'from-gray-800 to-gray-700' : ''}`}>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-white text-green-600 flex items-center justify-center rounded-full font-extrabold shadow"
            >
              <Bot size={24} />
            </motion.div>
            <h1 className="text-lg">WasteBot Assistant</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={clearChat}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title="Clear chat"
            >
              <Trash2 size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={exportChat}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title="Export chat"
            >
              <Download size={18} />
            </motion.button>
            
            <label htmlFor="import-chat" className="cursor-pointer p-2 rounded-full hover:bg-white/20 transition-colors" title="Import chat">
              <Upload size={18} />
              <input
                id="import-chat"
                type="file"
                accept=".json"
                onChange={importChat}
                className="hidden"
              />
            </label>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${isDarkMode ? 'bg-gray-900/40' : ''}`}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex flex-col max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === "bot" ? (
                      <Bot size={14} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                    ) : (
                      <User size={14} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                    )}
                    <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-lg text-sm sm:text-base ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-br-none"
                        : `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white/80 text-gray-800'} rounded-bl-none border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex flex-col max-w-[75%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot size={14} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Now typing</span>
                </div>
                <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white/70'} text-gray-600 rounded-2xl shadow-md flex items-center gap-2`}>
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-300"></span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/30'}`}>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} shadow-md`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </motion.button>
            
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                rows={1}
                className={`w-full px-4 py-3 pr-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md shadow-lg resize-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white/80 text-gray-800 border-gray-300'}`}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              {input && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setInput("")}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
                >
                  ✕
                </motion.button>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-3 bg-gradient-to-r from-green-500 to-teal-600 hover:shadow-xl text-white rounded-full shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </motion.button>
          </div>
          
          <div className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </motion.div>
    </div>
  );
}