'use-client'

export default function ProgressBar({options, selectHook}: any) {
    const [selectedOption, setSelectedOption] = selectHook;

    return (
        <div>
            <div
              className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-800"
            >
                <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                    {options.map((option: any, index: any) => (
                        <li className="flex items-center gap-2 bg-gray-900 p-2 rounded-lg w-[80px]" key={index}>
                            <span className={selectedOption == index ? "size-6 rounded-full bg-blue-700 text-center text-[10px]/6 font-bold text-white" : "size-6 rounded-full bg-gray-300 text-center text-[10px]/6 font-bold text-gray-700"}> {index + 1} </span>
                            <span className="hidden sm:block"> {option} </span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

