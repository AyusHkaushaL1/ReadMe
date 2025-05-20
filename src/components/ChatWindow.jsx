import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";

const initialMessages = [
  { id: 1, sender: "Ayush", text: "I bought a product from your store in November as a Diwali gift for a family member. However, it turns out to be something very similar to what they already have. I was hoping you'd be able to refund me, as it is un-opened.", time: "3min" },
  { id: 2, sender: "agent", text: "Let me just look into this for you, Ayush.", time: "1min" },
  { id: 3, sender: "agent", text: "We can only refund orders from the last 60 days.", time: "1d" },
  { id: 4, sender: "Ayush", text: "I placed the order over 60 days ago 😢. Could you make an exception, please?", time: "1min" },
];

export default function ChatWindow({ chatInput, setChatInput, copilotWelcomeSent, setCopilotWelcomeSent }) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    if (!copilotWelcomeSent) {
      const aiWelcomeMessage = {
        id: Date.now() + 1,
        sender: "agent",
        text: "Hi, I'm Fin AI Copilot. Ask me anything about this conversation to get quick answers and relevant information.",
        time: "Just now",
      };
      setMessages((prevMessages) => [...prevMessages, aiWelcomeMessage]);
      setCopilotWelcomeSent(true);
    }
  }, [copilotWelcomeSent, setCopilotWelcomeSent]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "agent", text: chatInput, time: "Just now" }]);
    setChatInput("");
  };

  return (
    <div className="flex flex-col w-3/5 bg-white border-r shadow-md">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ayush</h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">🔍</button>
          <button className="text-gray-500 hover:text-gray-700">🔗</button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300">Close</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="relative mb-2">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows="3"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type a message... Use JX for shortcuts"
          ></textarea>
          <div className="absolute bottom-2 left-3 text-gray-500 flex space-x-2">
            <span className="cursor-pointer hover:text-blue-500">B</span>
            <span className="cursor-pointer hover:text-blue-500">I</span>
            <span className="cursor-pointer hover:text-blue-500">🔗</span>
            <span className="cursor-pointer hover:text-blue-500">H1</span>
            <span className="cursor-pointer hover:text-blue-500">H2</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 text-gray-500">
            <button className="hover:text-blue-500">📎</button>
            <button className="hover:text-blue-500">😊</button>
            <button className="hover:text-blue-500">📸</button>
          </div>
          <button onClick={handleSend} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Send
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">Refund status?</span>
          <span className="px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">Return policy details?</span>
        </div>
      </div>
    </div>
  );
}