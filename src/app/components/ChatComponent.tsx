'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function ChatComponent({firstPrompt, lastMessages}: any) {
  const { messages, input, handleSubmit, handleInputChange, setInput, isLoading } = useChat({
    api: '/api'
  });
  const chatContainer = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

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
      <div ref={chatContainer} className='w-[100%] h-full mb-4 rounded-lg overflow-y-auto scrollbar-thin pr-2'>
        {messages.slice(1).map((m, index) => (
          <div key={m.id} className={index % 2 == 0 ? 'w-full flex justify-start h-fit' : 'w-full flex justify-end h-fit'}>
            <p className='text-gray-200 max-w-[470px] bg-blue-600 rounded-xl p-2 break-words'>{m.content}</p>
          </div>
        ))}
      </div>
    ) 
  }
  
  //handle new chat creation
  useEffect(() => {
    if (firstPrompt) {
      setInput(firstPrompt);
      setTimeout(() => {
        triggerSubmit();          
      }, 50)
    }
  }, []);

  //handle retrieved chat
  

  return (
    <div className='w-full h-full bg-gray-900 rounded-lg p-6 relative flex flex-col justify-between'>
      {renderResponse()}
      <form ref={formRef} onSubmit={handleSubmit} className='w-[100%] flex justify-center items-center h-[8%]'>
        <input
          value={messages.length > 0 ? input : ''}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={isLoading}
          className='w-[100%] rounded-xl h-[100%] px-2'
        />
      </form>
    </div>
  );
}