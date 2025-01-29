'use client';

import { Message, useChat } from 'ai/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs'
import { postMessages } from '../actions';

export default function ChatComponent({firstPrompt, chats, chatId, fetchTrigger, setFetchTrigger, buttonsDisabled, setButtonsDisabled}: { firstPrompt: string | null; chats: any; chatId: number; fetchTrigger: boolean; setFetchTrigger: Function; buttonsDisabled: boolean; setButtonsDisabled: Function}) {
  const { isLoaded, userId } = useAuth();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorTriggered, setErrorTriggered] = useState<boolean>(false);

  const onFinishChat = () => {
    if (userId) {
        postMessages(userId, chatId, latestMessagesRef.current)
        .then(() => {
          return new Promise((resolve) => setTimeout(resolve, 1500));
        })
        .then(() => {
          setFetchTrigger(!fetchTrigger);
        }).then(() => {
          setButtonsDisabled(false);
        });
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
      onError: (error: any) => {
        setButtonsDisabled(false);
        const errorData = JSON.parse(error.message);
        if (errorData.remaining !== undefined && errorData.remaining == 0) {
          setShowError(true);
          setErrorTriggered(true);
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
      {showError ?
      <div className='bg-red-500 rounded-md p-1'>
      <div className='flex flex-row justify-end items-end px-1'><button className='text-gray-200' onClick={() => {setShowError(false)}}>{String.fromCharCode(10006)}</button></div>
      <div className='text-gray-200 font-fancyfont p-3'>
      You’ve interacted with/created chats 3 times in the last 24 hours, which is the maximum allowed.
      Don’t worry, you’ll be able to use it again once your limit resets.
      For an increase in usage, contact us.
      </div>
      </div>
      :
      <form 
        ref={formRef} 
        onSubmit={event => {
          setButtonsDisabled(true);
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
          disabled={isLoading || errorTriggered || buttonsDisabled}
          className='w-[100%] rounded-xl h-[100%] px-2'
        />
      </form>}
    </div>
  );
}