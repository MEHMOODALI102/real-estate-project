
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import { useChat } from './useChat';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage } = useChat();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Icon Button */}
      <button
        onClick={toggleChat}
        className={cn(
          'flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300',
          isOpen ? 'bg-white text-luxury-gold rotate-90' : 'bg-luxury-gold text-white hover:bg-luxury-gold/90'
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform opacity-0 scale-95 pointer-events-none',
          isOpen && 'opacity-100 scale-100 pointer-events-auto'
        )}
      >
        {/* Chat Header */}
        <div className="bg-luxury-gold text-white p-4">
          <h3 className="font-semibold">Estate Assistant</h3>
          <p className="text-xs text-white/80">How can I help you today?</p>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-luxury-gold border-y border-l border-gray-200"
          />
          <button
            type="submit"
            className="bg-luxury-gold text-white rounded-r-md px-4 hover:bg-luxury-gold/90 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
