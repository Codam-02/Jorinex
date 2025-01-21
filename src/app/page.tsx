'use client'

import Image from "next/image";
import ChatComponent from "./components/ChatComponent";
import NewChatComponent from "./components/NewChatComponent";
import ParameterSelector from "./components/ParameterSelector";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import { SignIn, useUser, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { fetchChats } from "./actions";

type DataType = {
  [key: number]: any;
};

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId } = useAuth();
  const [data, setData] = useState<DataType>({3:'', 4:''});
  const [mode, setMode] = useState('home');
  const [newChat, setNewChat] = useState(false);
  const [chats, setChats] = useState<object>({});

  useEffect(() => {
    const fetchData = async (user_Id: string) => {
      const value = await fetchChats(user_Id);
      return value;
    }
    if (userId) {
      const value = fetchData(userId);
      setChats(value);
    }
  }, [user]);

  if (!isLoaded || !isSignedIn || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-800">
        <SignIn routing="hash" appearance={{baseTheme: dark}}/>
      </div>
    )
  };

  const updateObject = (key: number, value: string) => {
    setData((prevData: object) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const generatePrompt = () => {
    try {
      return `Write a ${data[0]} with the following topic: ${data[1]}` + (data[3].length > 0 ? ` and responding to the following message: ${data[3]}` : ``) + `. Use a ${data[2]} level of formality.` + (data[4].length > 0 ? ` When generating the message, keep in mind the following details/indications: ${data[4]}` : ``);
    }
    catch {
      throw new Error("'Data' object is incomplete")
    }
  };

  return (
    <div className="flex h-[screen]">
      <div className="w-[18%] h-[screen]">
      <Sidebar setMode={setMode}/>
      </div>

      <div className="w-[82%] bg-gray-800 h-screen">
        <div className="w-full h-screen px-6 py-5 flex justify-center items-center">
        {mode == 'home' ? <NewChatComponent setMode={setMode}/> : mode == 'new chat' 
        ? <ParameterSelector updateObject={updateObject} setData={setData} setMode={setMode} setNewChat={setNewChat}/> 
        : newChat 
        ? <ChatComponent firstPrompt={generatePrompt()} lastMessages={null} chatId={Object.keys(chats).length ? Math.max(...Object.keys(chats).map(Number)) + 1 
          : 1}/> 
        : <ChatComponent firstPrompt={null} lastMessages={null} chatId={Object.keys(chats).length 
        ? Math.max(...Object.keys(chats).map(Number)) + 1 
        : 1}/>}
        </div>
      </div>
    </div>
  );
}