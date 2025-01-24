'use client'

import { Message } from "ai/react";

export default function Sidebar({setMode, chats} : any) {

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

    return (
    <div className="flex h-screen flex-col justify-between border-e bg-gray-900">
        <div className="h-[70%]">
        <div className="px-4 py-6 h-fit">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                Logo
            </span>
        </div>
        <div className="mx-4 my-2">
            <ul className="space-y-2">
                {Object.keys(chats).map((key) => (
                    <li key={key}>
                    <a
                    //onClick={() => handleOptionClick(index)}
                    className={"min-w-[170px] bg-gray-800 block rounded-xl px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-800 font-textfont"}
                    >
                    {chats[key].chatname}
                    </a>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        <div className="h-fit mx-4 my-2 flex flex-col justify-end pb-1">
            <div className="bg-gray-600 rounded-lg">
                <p className="break-words text-gray-200 rounded-xl text-center p-2 font-fancyfont">Please send any feedback, request or question you have.</p>
                <div className="flex flex-row justify-center p-2">
                    <a href="mailto:coccia.damianoj@gmail.com" className="bg-blue-700 hover:bg-gray-300 rounded-lg text-2xl px-5 py-1 text-gray-300 hover:text-blue-700">{String.fromCharCode(0x2709)}</a>
                </div>
            </div>
        </div>
    </div>
    )
}