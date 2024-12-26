'use client';

import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import ProgressBar from "./ProgressBar";

export default function ParameterSelector({updateObject}: any) {

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
  const hooks = [useState(null), useState(null), useState(null)];

  return (
    <div className="w-[350px] bg-gray-950 p-4 rounded-lg h-fit">
      <ProgressBar options = {stages} selectHook = {[selectedStage, setSelectedStage]}/>
      <div className="flex justify-center items-center mt-6 h-[344px]">
      <HamburgerMenu options = {options.at(selectedStage)} selectHook = {hooks[selectedStage]} />
      </div>
      <div className="flex justify-center mt-4 gap-[185px]">
        <button className={selectedStage == 0 ? "bg-gray-900 block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 text-center" : "bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-center"} onClick={handleClickBack} disabled={selectedStage == 0}>Back</button>
        <button className={selectedStage == stages.length - 1 || hooks[selectedStage][0] == null ? "bg-gray-900 block rounded-lg px-4 py-2 text-sm font-medium text-gray-300 text-center" : "bg-blue-700 block rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-center"} onClick={handleClickNext} disabled={selectedStage == stages.length - 1 || hooks[selectedStage][0] == null}>Next</button>
      </div>
    </div>
  )
}