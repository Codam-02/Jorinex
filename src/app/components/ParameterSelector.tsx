'use client';

import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import ProgressBar from "./ProgressBar";

export default function ParameterSelector({updateObject, setMode}: any) {

  const stages = ['Type', 'Topic', 'Info']
  const [selectedStage, setSelectedStage] = useState(0);
  
  const handleClickNext = () => {
    hooks.forEach((item, index) => {
      if (item[0] != null) {
        updateObject(index, options[index][item[0]] ? options[index][item[0]] : '');
      }
    });
    setSelectedStage(selectedStage + 1);
  };

  const handleClickBack = () => {
    hooks.forEach((item, index) => {
      if (item[0] != null) {
        updateObject(index, options[index][item[0]] ? options[index][item[0]] : '');
      }
    });
    setSelectedStage(selectedStage - 1);
  };

  const options = [['Email', 'Text/Direct message'], ['Cold outreach', 'Reply', 'Congratulations', 'Job offer', 'Partnership proposal', 'Feedback request', 'Event invitation', 'Apology'],['This', 'Is', 'A', 'Test']]
  const questions = ["What type of message are you looking to generate?", "What's the topic of your message?", "Do you like this test?"]
  const hooks = [useState(null), useState(null), useState(null)];

  return (
    selectedStage < stages.length ?
    <div className="relative w-[350px] bg-gray-950 p-5 rounded-lg h-[556px]">
      <div className="h-fit">
      <ProgressBar options={stages} selectHook={[selectedStage, setSelectedStage]} />
      <h3 className="text-lg text-gray-300 mt-7 text-center font-bold">{questions[selectedStage]}</h3>
      </div>
      <div className="h-[68%] mt-4 flex flex-col justify-center items-center">
        <HamburgerMenu options={options.at(selectedStage)} selectHook={hooks[selectedStage]} />
      </div>
      <div className="absolute bottom-4 flex justify-center mt-4 gap-[185px]">
          <button className={selectedStage == 0 ? "bg-gray-900 block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 text-center" : "bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center"} onClick={handleClickBack} disabled={selectedStage == 0}>Back</button>
          <button className={selectedStage == stages.length|| hooks[selectedStage][0] == null ? "bg-gray-900 block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 text-center" : "bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center"} onClick={handleClickNext} disabled={selectedStage == stages.length || hooks[selectedStage][0] == null}>Next</button>
      </div>
    </div>
    :
    <div className="bg-gray-950 p-5 rounded-lg h-fit flex flex-col justify-center items-center gap-14 w-[450px]">
      <h2 className="text-gray-400 text-xl text-center">A new message with the submitted parameters will be generated</h2>
      <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={()=>setMode('chat')} className="bg-blue-800 block rounded-lg px-4 py-2 text-base text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center">Generate</button>
      <button onClick={()=>setSelectedStage(stages.length - 1)} className="bg-gray-800 block rounded-lg px-4 py-2 text-base text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-center">Back</button>
      </div>    
    </div>
  )
}