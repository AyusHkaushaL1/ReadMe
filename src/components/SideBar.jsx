import React from "react";
import { motion } from "framer-motion";

const conversations = [
  { id: 1, name: "Rahul Sharma - Support", subject: "Query about recent order...", time: "45m" },
  { id: 2, name: "Priya Singh - Sales", subject: "New lead from Mumbai...", time: "3min" },
  { id: 3, name: "Anil Kumar - Marketing", subject: "Feedback on campaign...", time: "30m" },
  { id: 4, name: "Sneha Reddy - Tech", subject: "Facing issue with API...", time: "45m" },
  { id: 5, name: "Amit Patel - Banking", subject: "Question regarding new...", time: "45m" },
];

export default function Sidebar() {
  return (
    <motion.div
      className="w-1/5 p-4 bg-white border-r overflow-y-auto shadow-md"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4">Your inbox</h2>
      <div className="flex mb-4 text-sm font-semibold text-gray-600">
        <span className="mr-4 text-blue-600 border-b-2 border-blue-600 pb-1">5 Open</span>
        <span className="mr-4 hover:text-blue-600 cursor-pointer">Waiting</span>
        <span className="hover:text-blue-600 cursor-pointer">Request</span>
      </div>
      <ul>
        {conversations.map((conv) => (
          <li key={conv.id} className="py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800">{conv.name}</div>
              <div className="text-xs text-gray-500">{conv.time}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1 truncate">{conv.subject}</div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}