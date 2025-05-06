import { motion } from "framer-motion";
import React from "react";
import { Signalball } from "../common/Signalball";
import CardContainer from "../common/Cardcontainer";

export const Toolskills = () => {
  return (
    <div className="flex flex-col w-full h-fit max-w-[1440px] ">
      <div id="Tools-title" className="flex items-center text-white">
        <Signalball />
        <h1 className="font-inst text-[4.5rem]/15 text-center text-wrap bg-gradient-to-br from-white via-[#c7c7c7] to-[#3d3d3d] bg-clip-text text-transparent">
          What I Use & Know
        </h1>
      </div>
      <div
        id="Tools-cards"
        className="flex flex-row w-full h-full gap-12 text-white my-15"
      >
        <div id="skills-card" className="flex flex-col w-1/2">
          <p className="text-white font-inst text-3xl ml-1">tool i use</p>
          <CardContainer />
        </div>
        <div id="tools-card" className="flex flex-col w-1/2">
        <p className="text-white font-inst text-3xl ml-1">skills</p>
          <CardContainer />
        </div>
      </div>
    </div>
  );
};
