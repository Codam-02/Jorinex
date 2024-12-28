'use client'

export default function NewChatComponent({setMode} : any) {
    return (
        <div className="w-[700px] bg-gray-950 p-5 rounded-lg h-fit flex flex-col justify-center items-center gap-10">
            <h1 className="text-gray-400 text-3xl text-center">Leverage Artificial Intelligence, enhance your communication and add professionality to your emails and messages</h1>
            <button onClick={()=>setMode('new chat')} className="bg-blue-800 block rounded-lg px-4 py-2 text-base text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center">Start Now</button>
        </div>
    )
}