import React from "react";
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  const isAgent = message.sender === "agent";
  const avatarText = isAgent ? "AI" : message.sender.split(" ")[0].charAt(0).toUpperCase();

  return (
    <motion.div
      className={`flex ${isAgent ? "justify-start" : "justify-end"} items-end`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isAgent && (
        <div className="mr-2 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-semibold">
          {avatarText}
        </div>
      )}
      <div
        className={`p-3 rounded-xl max-w-lg relative ${
          isAgent
            ? "bg-blue-50 text-gray-800 rounded-bl-sm"
            : "bg-purple-100 text-gray-800 rounded-br-sm"
        }`}
      >
        {!isAgent && (
          <div className="font-semibold text-xs mb-1 text-gray-700">
            {message.sender}
          </div>
        )}
        {message.text}
        <div className="text-right text-xs text-gray-500 mt-1">
          {message.time}
        </div>
      </div>
      {!isAgent && (
        <div className="ml-2 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-300 text-white text-xs font-semibold">
          {avatarText}
        </div>
      )}
    </motion.div>
  );
}