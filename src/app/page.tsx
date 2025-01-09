'use client'

import Image from "next/image";
import ChatComponent from "./components/ChatComponent";
import NewChatComponent from "./components/NewChatComponent";
import ParameterSelector from "./components/ParameterSelector";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({});

  const [mode, setMode] = useState('home')

  const updateObject = (key: number, value: string) => {
    setData((prevData: object) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="flex h-[screen]">
      <div className="w-[18%] h-[screen]">
      <Sidebar setMode={setMode}/>
      </div>

      <div className="w-[82%] bg-gray-800 h-screen">
        <div className="w-full h-screen px-6 py-5 flex justify-center items-center">
        {mode == 'home' ? <NewChatComponent setMode={setMode}/> : mode == 'new chat' ? <ParameterSelector updateObject={updateObject} setMode={setMode}/> : <ChatComponent firstPrompt={null} lastMessages={null} />}
        </div>
      </div>
    </div>
  );
}