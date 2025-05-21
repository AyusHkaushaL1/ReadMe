import React, { useState } from "react";
import SideBar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";
import CopilotPanel from "./components/CopilotPanel";

export default function App() {
  const [chatInput, setChatInput] = useState("");
  const [copilotWelcomeSent, setCopilotWelcomeSent] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <SideBar />
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

