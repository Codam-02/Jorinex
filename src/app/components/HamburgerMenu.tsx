'use client'

export default function HamburgerMenu({options, selectHook}: any) {
  const [selectedOption, setSelectedOption] = selectHook;

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="w-fit">
      <ul className="space-y-2">
      {options.map((option: any, index: any) => (
        <li
          key = {index}
        >
        <a
          onClick={() => handleOptionClick(index)}
          className={selectedOption === index
            ? "min-w-[170px] block rounded-lg bg-gray-300 px-4 py-2 text-[13px] font-medium text-gray-900 text-center font-textfont"
            : "min-w-[170px] bg-gray-800 block rounded-lg px-4 py-2 text-[13px] font-medium text-gray-300 hover:bg-gray-100 hover:text-gray-700 text-center font-textfont"
          }
        >
          {option}
        </a>
      </li>
      ))}
      </ul>
    </div>
  );
}

