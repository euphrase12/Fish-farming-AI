import React, { useState } from 'react';

/**
 * ChatAgent Component
 * A floating chat widget for AI-powered aquaculture assistance
 * Features: Minimizable, responsive, clean UI
 */
export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Mwaramutse! I'm your AI Fish Farming Assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
    };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setIsLoading(true);
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: `I received your message: "${inputValue}". This is a placeholder response. Connect to a real AI service for actual support.`,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Widget Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600
          text-white rounded-full p-4 shadow-lg transition-all duration-300
          w-14 h-14 flex items-center justify-center font-bold text-xl
          z-40 hover:scale-110
        "
        aria-label="Open chat assistant"
        title="AI Fish Farming Assistant"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl
            border border-gray-200 overflow-hidden flex flex-col
            z-50 max-h-96 md:w-96
          "
          role="dialog"
          aria-label="Chat assistant"
        >
          {/* Header */}
          <div className="bg-emerald-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">🤖 AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-emerald-600 rounded p-1 transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-xs px-4 py-2 rounded-lg text-sm
                    ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="
                flex-1 px-3 py-2 border border-gray-300 rounded
                focus:outline-none focus:border-emerald-500 text-sm
              "
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="
                bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400
                text-white rounded px-3 py-2 transition-colors text-sm
                font-medium
              "
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
