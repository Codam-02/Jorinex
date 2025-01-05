'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function ChatComponent({firstPrompt, lastMessages}: any) {
  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat();
  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  }

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div ref={chatContainer} className='w-[100%] h-[93%] pb-4 bg-gray-800 rounded-lg'>
        {messages.map((m, index) => (
          <div key={m.id}>
            <div>
              <p className='text-gray-200'>{m.content}</p>
            </div>
          </div>
        ))}
      </div>
    ) 
  }
  
  //handle new chat creation


  //handle retrieved chat
  

  return (
    <div className='w-full h-full bg-gray-900 rounded-lg p-6 relative flex flex-col justify-between'>
      {renderResponse()}
      <form onSubmit={handleSubmit} className='w-[100%] flex justify-center items-center h-[7%]'>
        <input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={isLoading}
          className='w-[100%] rounded-xl h-[100%] px-2'
        />
      </form>
    </div>
  );
}