'use client'

export default function InputGroup({hook1, hook2, updateObject}: any) {
    
    const inputs:any = [["If you're replying to a message, paste the message below (recomended)", "Paste message to reply to"], ["Add any extra instructions (recomended)", "e.g. recipient's name, content/language, number of words..."]];
    const [inputValue1, setInputValue1] = hook1;
    const [inputValue2, setInputValue2] = hook2;

    const handleFirstChange = (event: any) => {
        updateObject(3, event.target.value);
        setInputValue1(event.target.value);
    };

    const handleSecondChange = (event: any) => {
        updateObject(4, event.target.value);
        setInputValue2(event.target.value);
    };

    return (
        <div className="flex flex-col gap-14">
            {
                inputs.map((item:any, index:any) => (
                    <label
                        key={index}
                        className="w-[450px] block overflow-hidden rounded-md border border-gray-400 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <span className="text-xs font-bold text-gray-500">{item[0]}</span>

                        <input
                            value={index == 0 ? inputValue1 : inputValue2}
                            placeholder={item[1]}
                            onChange={index == 0 ? handleFirstChange : handleSecondChange}
                            className="mt-1 w-full border-none bg-gray-800 rounded-lg p-2 text-gray-400 p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                    </label>
                ))
            }
        </div>
    )
}