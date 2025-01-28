'use client'

import Image from "next/image";

export default function Sidebar({setMode, chats, setSelectedChat, setNewChat} : any) {

    return (
    <div className="flex h-screen flex-col justify-between border-e bg-gray-900">
        <div className="h-[70%]">
        <div className="px-4 py-3 h-fit">
            <Image
            src="/logo.svg"
            alt="logo"
            width={45}
            height={45}
            style={{ cursor: "pointer" }}>
            </Image>
        </div>
        <div className="mx-4 my-2 h-full">
        <div
        onClick={() => {
            setMode('new chat');
            setNewChat(true);
        }}
        className="w-[70%] bg-gray-600 block rounded-md px-4 py-1 text-sm text-gray-100 hover:bg-gray-200 hover:text-gray-600 font-textfont mb-3 font-semibold flex justify-between items-center"
        >
            New chat
            <div className="bg-gray-300 border-solid border-2 border-gray-700 px-2 py-1 rounded-xl text-gray-600 text-md font-sans">{String.fromCharCode(0x271A)}</div>
        </div>
        <div className="h-[65%] overflow-y-auto scrollbar-thin pr-2">
            <ul className="space-y-2">
            {chats ? Object.keys(chats).map((key) => (
                <li key={key}>
                    <a
                    onClick={() => {
                        setSelectedChat(key);
                        setNewChat(false);
                        setMode('chat');
                    }}
                    className={
                        "w-full bg-gray-800 block rounded-xl px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-800 font-textfont"
                    }
                    >
                    {chats[key].chatname}
                    </a>
                </li>
                )) : null}
            </ul>
        </div>
        </div>
        </div>
        <div className="h-fit mx-4 my-2 flex flex-col justify-end pb-1">
            <div className="bg-gray-600 rounded-lg">
                <p className="break-words text-gray-200 rounded-xl text-center p-2 font-fancyfont">Please send any feedback, request or question you have.</p>
                <div className="flex flex-row justify-center items-center h-[50px] p-[1px] space-x-5 mb-3">
                    <Image
                    onClick={() => {
                        window.open("https://www.linkedin.com/in/damiano-jack-coccia-5b0609264/", "_blank", "noopener,noreferrer");
                    }}
                    src="/linkedinLogo.svg"
                    alt="linkedin"
                    width={50}
                    height={50}
                    style={{ cursor: "pointer" }}
                    />
                    <a href="mailto:coccia.damianoj@gmail.com" className="bg-blue-700 hover:bg-gray-300 rounded-lg text-2xl h-fit w-fit py-1 px-2 text-gray-300 hover:text-blue-700">{String.fromCharCode(0x2709)}</a>
                </div>
            </div>
        </div>
    </div>
    )
}