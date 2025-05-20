import React from "react";
import { motion } from "framer-motion";

const initialSources = [
  { title: "Getting a refund", locked: false },
  { title: "Refund for an order placed by mistake", locked: false },
  { title: "Refund for an unwanted gift", locked: false },
];

const advancedSources = [
  { title: "Processing a refund", locked: true },
  { title: "Refunding an order placed over 60 days ago", locked: false },
  { title: "Dealing with refund disputes", locked: true },
];

export default function CopilotPanel({ setChatInput }) {
  const [currentQuestion, setCurrentQuestion] = React.useState("");
  const [simulatedAiAnswer, setSimulatedAiAnswer] = React.useState(null);
  const [activeSources, setActiveSources] = React.useState(initialSources);

  const handleAddToComposer = (text) => {
    setChatInput(text);
    setSimulatedAiAnswer(null);
  };

  const handleAskQuestion = () => {
    if (!currentQuestion.trim()) {
      setSimulatedAiAnswer("Please type a question before asking.");
      return;
    }

    const questionLower = currentQuestion.toLowerCase();
    let answer = null;
    let newSources = initialSources;

    if (questionLower.includes("refund") && questionLower.includes("60 days")) {
      answer = "Our standard refund policy does not allow for returns after 60 days of the purchase date. However, exceptions can sometimes be made for specific circumstances. Please check our detailed policy for more information. This answer uses content from an internal article. Please make sure you can send this to the customer.";
      newSources = advancedSources;
    } else if (questionLower.includes("refund policy")) {
      answer = "Our general refund policy states that items can be returned within 30 days of purchase for a full refund, provided they are in their original condition. For specific details on different product categories, please refer to our official refund policy documentation.";
    } else if (questionLower.includes("exception")) {
      answer = "Exceptions to policies are reviewed on a case-by-case basis and typically require manager approval. Please provide more details about the situation for us to assess if an exception is possible.";
    } else if (questionLower.includes("hi") || questionLower.includes("hello")) {
      answer = "Hello! How can I help you today regarding this conversation?";
    } else {
      answer = "I'm not sure I understand your question fully. Could you please rephrase it or provide more details?";
    }

    setSimulatedAiAnswer(answer);
    setActiveSources(newSources);
    setCurrentQuestion("");
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <motion.div
      className="w-1/4 p-4 bg-purple-50 border-l overflow-y-auto shadow-md"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 mb-4 text-sm font-semibold">
        <button className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full">
          AI Copilot
        </button>
        <button className="px-3 py-1 text-gray-600 rounded-full hover:bg-gray-200">
          Details
        </button>
      </div>

      {simulatedAiAnswer ? (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <p className="text-sm text-gray-700">
            {simulatedAiAnswer}
            {simulatedAiAnswer.includes("internal article") && (
              <span className="ml-1 text-blue-500 cursor-pointer">ⓘ</span>
            )}
          </p>
          {simulatedAiAnswer.includes("internal article") && (
            <p className="mt-3 p-2 text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md">
              This answer uses content from an internal article. Please make sure you can send this to the customer.
            </p>
          )}

          {simulatedAiAnswer.includes("Our standard refund policy does not allow") && (
            <button
              onClick={() => handleAddToComposer("We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. To assist you with your refund request, could you please provide your order ID and proof of purchase. Please note: We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Add to composer <span className="ml-2">↓</span>
            </button>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Hi, I'm Fin AI Copilot</h2>
          <p className="mb-4 text-sm text-gray-600">Ask me anything about this conversation.</p>
        </>
      )}

      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-sm text-gray-800">
          {activeSources.length} relevant sources found
        </h3>
        <ul className="text-sm space-y-2">
          {activeSources.map((src, idx) => (
            <li key={idx} className="flex items-center text-gray-700">
              <span className="mr-2">{src.locked ? "🔒" : "📄"}</span>
              <a href="#" className="hover:underline hover:text-blue-600">{src.title}</a>
            </li>
          ))}
          <li>
            <a href="#" className="text-blue-600 text-sm hover:underline">See all →</a>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ask a follow up question..."
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        <button
          onClick={handleAskQuestion}
          className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          disabled={!currentQuestion.trim()}
        >
          Ask Copilot
        </button>
      </div>
    </motion.div>
  );
}