import React, { use, useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../../createClient";
import { Skeletonloader } from "./Skeletonloader";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee" 

const CardContainer = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Fetch data from tblSkills
  useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("tblSkills")
        .select("image_url, name");
      if (error) {
        console.error("Error fetching skills:", error);
      } else {
        // Repeat the skills to ensure total 20 cards
        const repeatedSkills = [];
        const skillCount = data.length || 1; // Avoid division by zero
        const repeatCount = Math.ceil(20 / skillCount); // How many times to repeat to reach at least 20
        for (let i = 0; i < repeatCount; i++) {
          repeatedSkills.push(...data);
        }
        // Trim to exactly 20 cards
        setSkills(repeatedSkills.slice(0, 20));
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // 20 card kosong
  const emptyCards = Array.from({ length: 5 }, (_, i) => (
    <div
      key={`empty-${i}`}
      className="card w-22 h-22 mx-2 min-w-[88px] min-h-[88px] flex-shrink-0 rounded-xl border border-phantom-800 bg-gradient-to-br from-[#1d1d1d] via-phantom-900 to-phantom-950 flex items-center justify-center"
    />
  ));
  
  return (
    <div className="card-container w-full h-fit py-7 border border-phantom-600 bg-white/2 backdrop-blur-md rounded-2xl overflow-hidden relative">
      {/* Gradient masking kiri */}
      <div className="absolute z-20 top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#0f0f0f] to-transparent pointer-events-none"></div>
      {/* Gradient masking kanan */}
      <div className="absolute z-20 top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#0f0f0f] to-transparent pointer-events-none"></div>

      <div className="row1 flex gap-4 p-2 overflow-hidden">
      <Marquee speed={70} direction="right">
        {emptyCards}
        {emptyCards}
      </Marquee>
        </div>
      <div className="grouprow2 flex gap-4 p-2 overflow-hidden">
      <Marquee speed={70} direction="left" pauseOnHover>
        {isLoading
          ? Array.from({ length: 20 }, (_, i) => (
              <div
                key={`empty-${i}`}
                className="card w-22 h-22 min-w-[88px] min-h-[88px] flex-shrink-0 rounded-xl border border-phantom-800 bg-gradient-to-br from-[#1d1d1d] via-phantom-900 to-phantom-950 flex items-center justify-center"
              >
                <div className="w-15 h-15 object-contain">
                  <Skeletonloader />
                </div>
              </div>
            ))
          :skills.map((skill, i) => (
            <div
              key={`r2-${i}`}
              onMouseEnter={() => setHoveredIndex(i)} // Set hovered index
              onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index
              className={`card w-22 h-22 mx-2 min-w-[88px] min-h-[88px] flex-shrink-0 rounded-xl border border-phantom-800 hover:border-phantom-700 bg-gradient-to-br from-[#1d1d1d] via-phantom-900 to-phantom-950 flex items-center justify-center relative`}
            >
              {hoveredIndex === i && (
                <span className="absolute top-[37%] left-0 text-white text-sm text-center font-lex max-w-22 overflow-hidden text-ellipsis whitespace-nowrap px-2">
                  {skill?.name}
                </span>
              )}
              <img
                src={skill.image_url}
                alt={skill.name || `Skill ${i}`}
                className="w-15 h-15 object-contain"
              />
            </div>
          ))}
            </Marquee>
      </div>
      <div className="row3 flex shrink-0 grow-0 basis-0 w-full p-2 overflow-x-hidden">
        <Marquee speed={70} direction="right">
        {emptyCards}
        {emptyCards}
        </Marquee>
      </div>
    </div>
  );
};

export default CardContainer;
