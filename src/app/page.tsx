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
    <div>
      <div className="mx-auto flex h-[90%]">
        <div className="w-[18%]">
        <Sidebar setMode={setMode}/>
        </div>

        <div className="h-[screen] w-[82%] bg-gray-800 flex justify-center items-center">
          <div>
          {mode == 'home' ? <NewChatComponent setMode={setMode}/> : mode == 'new chat' ? <ParameterSelector updateObject={updateObject} setMode={setMode}/> : <ChatComponent />}
          </div>
        </div>
      </div>

      <footer className="bg-gray-950 p-4 h-fit">
        <div className="mx-auto text-center">
          <p className="text-gray-200">&copy; 2024 Cool App. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}