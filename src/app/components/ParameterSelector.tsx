'use client';

import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import ProgressBar from "./ProgressBar";
import InputGroup from "./InputGroup";

export default function ParameterSelector({updateObject, setMode}: any) {

  const stages = ['Type', 'Topic', 'Formality', 'Info']
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

  const options = [['Email', 'Text/Direct message'], ['Standard reply', 'Cold outreach', 'Congratulations', 'Job offer', 'Partnership proposal', 'Feedback request', 'Event invitation', 'Apology'], ['Low', 'Moderate', 'High'], ['This', 'Is', 'A', 'Test']]
  const questions = ["What type of message are you looking to generate?", "What's the broad topic of your message?", "What do you want the level of formality to be?", "Provide additional info"]
  const hooks = Array.from({ length: stages.length - 1}, () => useState(null));
  const input1Hook = useState('');
  const input2Hook = useState('');

  return (
    selectedStage < stages.length ?
    <div className="relative w-fit bg-gray-950 p-5 rounded-lg h-[556px]">
      <div className="h-fit justify-center">
      <ProgressBar options={stages} selectHook={[selectedStage, setSelectedStage]} />
      <div className="flex flex-col items-center">
      <h3 className="w-[450px] text-lg text-gray-300 mt-6 text-center font-bold font-textfont">{questions[selectedStage]}</h3>
      </div>
      </div>
      {
      selectedStage == stages.length - 1 ?
      <>
      <div className="h-[68%] mt-4 flex flex-col justify-center items-center">
        <InputGroup updateObject={updateObject} hook1={input1Hook} hook2={input2Hook}/>
      </div>
      <div className="absolute w-[92.5%] bottom-4 flex justify-between mt-4">
          <button className={"bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center font-textfont"} onClick={handleClickBack}>Back</button>
          <button className={"bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center font-textfont"} onClick={handleClickNext}>Next</button>
      </div>
      </>
      :
      <>
      <div className="h-[68%] mt-4 flex flex-col justify-center items-center">
        <HamburgerMenu options={options.at(selectedStage)} selectHook={hooks[selectedStage]} />
      </div>
      <div className="absolute w-[92.5%] bottom-4 flex justify-between mt-4">
          <button className={selectedStage == 0 ? "bg-gray-900 block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 text-center font-textfont" : "bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center font-textfont"} onClick={handleClickBack} disabled={selectedStage == 0}>Back</button>
          <button className={selectedStage == stages.length|| hooks[selectedStage][0] == null ? "bg-gray-900 block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 text-center font-textfont" : "bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center font-textfont"} onClick={handleClickNext} disabled={selectedStage == stages.length || hooks[selectedStage][0] == null}>Next</button>
      </div>
      </>
      }
    </div>
    :
    <div className="bg-gray-950 p-5 rounded-lg h-fit flex flex-col justify-center items-center gap-14 w-[450px]">
      <h2 className="text-gray-400 text-xl text-center font-fancyfont">A new message with the submitted parameters will be generated</h2>
      <div className="flex flex-col justify-center items-center gap-4">
      <button onClick={()=>setMode('chat')} className="bg-blue-800 block rounded-lg px-4 py-2 text-base text-gray-200 hover:bg-gray-100 hover:text-gray-700 text-center font-fancyfont">Generate</button>
      <button onClick={()=>setSelectedStage(stages.length - 1)} className="bg-gray-800 block rounded-lg px-4 py-2 text-base text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-center font-fancyfont">Back</button>
      </div>    
    </div>
  )
}