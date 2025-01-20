'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs'
import { postMessages } from '../actions';

export default function ChatComponent({firstPrompt, lastMessages, chatId}: { firstPrompt: string | null; lastMessages: Message[] | null; chatId: number }) {
  const { messages, input, handleSubmit, handleInputChange, setInput, isLoading } = useChat({
    onFinish: () => {
      setTimeout(() => {
        if (userId) {
          postMessages(userId, chatId,messages);
        }
      }, 50);
    }
  });
  const chatContainer = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    return null
  };

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
      <div ref={chatContainer} className='w-[100%] h-full mb-4 rounded-lg overflow-y-auto scrollbar-thin pr-2 flex flex-col gap-5'>
        {messages.slice(1).map((m, index) => (
          <div key={m.id} className={index % 2 == 0 ? 'w-full flex justify-start h-fit' : 'w-full flex justify-end h-fit'}>
            <p
              className='text-gray-200 max-w-[470px] bg-blue-800 rounded-xl p-3 border border-blue-900 shadow-sm whitespace-pre-wrap font-mono'
            > 
              {m.content}
            </p>
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
      <form 
        ref={formRef} 
        onSubmit={event => {
          handleSubmit(event, {
            body: {
              user_id: userId,
              chat_id: chatId
            },
          });
        }}
        className='w-[100%] flex justify-center items-center h-[8%]'>
        <input
          name='prompt'
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