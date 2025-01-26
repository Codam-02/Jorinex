'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs'
import { postMessages } from '../actions';

export default function ChatComponent({firstPrompt, chats, chatId, fetchTrigger, setFetchTrigger}: { firstPrompt: string | null; chats: any; chatId: number; fetchTrigger: boolean; setFetchTrigger: Function}) {
  const { isLoaded, userId } = useAuth();

  const onFinishChat = () => {
    if (userId) {
      postMessages(userId, chatId, latestMessagesRef.current).then(
      setFetchTrigger(!fetchTrigger));
    }
  }

  const chatOptions = useMemo(() => {
    return {
      initialMessages: firstPrompt
        ? undefined
        : recordsToMessages(chats[chatId.toString()]?.messages || []),
      onFinish: () => {
        if (userId) {
          onFinishChat();
        }
      },
    };
  }, [firstPrompt, chats, chatId, userId, onFinishChat]);

  const { messages, input, handleSubmit, handleInputChange, setInput, isLoading } = useChat(chatOptions);

  const chatContainer = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const latestMessagesRef = useRef(messages);
  
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
    latestMessagesRef.current = messages;
  }, [messages]);

  const renderResponse = () => {
    return (
      <div ref={chatContainer} className='w-[100%] h-full mb-4 rounded-lg overflow-y-auto scrollbar-thin pr-2 flex flex-col gap-5'>
        {messages.slice(1).map((m: any, index: any) => (
          <div key={m.id} className={index % 2 == 0 ? 'w-full flex justify-start h-fit' : 'w-full flex justify-end h-fit'}>
            <p
              className='text-gray-200 max-w-[470px] bg-gray-800 rounded-xl p-3 border border-blue-900 shadow-sm whitespace-pre-wrap font-mono'
            > 
              {m.content}
            </p>
          </div>
        ))}
      </div>
    ) 
  }

  function recordsToMessages(records: Record<string, unknown>[]): Message[] {
    return records
      .map((record) => {
        const id = typeof record.id === 'string' ? record.id : undefined;
        const content = typeof record.content === 'string' ? record.content : undefined;
        const role = ['system', 'user', 'assistant', 'data'].includes(record.role as string)
          ? (record.role as Message['role'])
          : undefined;
  
        if (!id || !content || !role) {
          console.warn(`Invalid record skipped: ${JSON.stringify(record)}`);
          return null;
        }
  
        return {
          id,
          content,
          role,
        } as Message;
      })
      .filter((message): message is Message => message !== null);
  }
  
  useEffect(() => {
    if (firstPrompt) {
      setInput(firstPrompt);
      setTimeout(() => {
        triggerSubmit();          
      }, 50)
    }
  }, []);

  const chatKey = `chat-${chatId}`;

  return (
    <div className='w-full h-full bg-gray-900 rounded-lg p-6 relative flex flex-col justify-between' key={chatKey}>
      {renderResponse()}
      <form 
        ref={formRef} 
        onSubmit={event => {
          handleSubmit(event, {
            body: {
              user_id: userId,
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