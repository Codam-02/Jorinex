'use client'

import Image from "next/image";
import ChatComponent from "./components/ChatComponent";
import NewChatComponent from "./components/NewChatComponent";
import ParameterSelector from "./components/ParameterSelector";
import Sidebar from "./components/Sidebar";
import { useState, useEffect, useRef } from "react";
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
  const [chats, setChats] = useState<any>({});
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
  const [newChat, setNewChat] = useState<boolean>();

  useEffect(() => {
    const fetchData = async (user_Id: string) => {
      const value = await fetchChats(user_Id);
      return value;
    };
    if (userId) {
      fetchData(userId).then((value) => {
        setChats(value);
      });
    }
  }, [user, fetchTrigger]);

  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);

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
      <Sidebar setMode={setMode} chats={chats} setSelectedChat={setSelectedChat} newChat={newChat} setNewChat={setNewChat}/>
      </div>

      <div className="w-[82%] bg-gray-800 h-screen">
        <div className="w-full h-screen px-6 py-5 flex justify-center items-center" key={`chatdiv-${selectedChat}`}>
        {mode === 'home' ? <NewChatComponent setMode={setMode}/> : mode === 'new chat' ?
         <ParameterSelector updateObject={updateObject} setData={setData} setMode={setMode} setNewChat={setNewChat} setSelectedChat={setSelectedChat} chats={chats}/> 
        :
         <ChatComponent firstPrompt={newChat ? generatePrompt() : null} chats={chats} chatId={selectedChat} fetchTrigger={fetchTrigger} setFetchTrigger={setFetchTrigger}/>}
        </div>
      </div>
    </div>
  );
}