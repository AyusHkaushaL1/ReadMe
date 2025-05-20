import React, { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import ChatWindow from "./components/chatWindow";
import CopilotPanel from "./components/copilotPannel";

export default function App() {
  const [chatInput, setChatInput] = useState("");
  const [copilotWelcomeSent, setCopilotWelcomeSent] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <ChatWindow
        chatInput={chatInput}
        setChatInput={setChatInput}
        copilotWelcomeSent={copilotWelcomeSent}
        setCopilotWelcomeSent={setCopilotWelcomeSent}
      />
      <CopilotPanel setChatInput={setChatInput} />
    </div>
  );
}