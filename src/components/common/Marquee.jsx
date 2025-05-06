import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../../createClient";
import { motion, useAnimationFrame } from "framer-motion";

export const Marquee = () => {
  const [marquee, setMarquee] = useState("");
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchMarquee();
  }, []);

  async function fetchMarquee() {
    let { data, error } = await supabase
      .from("tblMarquee")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching marquee", error);
    } else {
      setMarquee(data);
    }
  }

  const content = `${marquee?.text || "nice to meet you > "}`;

  // Manual update posisi x setiap frame
  const x = useRef(0);
  useAnimationFrame((_, delta) => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marqueeWidth = marqueeRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;

    x.current -= (delta * 0.13); // Kecepatan scroll

    // Reset posisi ketika seluruh blok pertama selesai melewati layar kiri
    if (Math.abs(x.current) >= marqueeWidth) {
      x.current = 0;
    }

    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap w-full py-4 mt-10 mb-[30dvh]">
      <div ref={containerRef} className="flex shrink-0">
        <div ref={marqueeRef} className="flex shrink-0">
          <span className="flex font-inst text-7xl bg-gradient-to-b from-white via-[#c7c7c7] to-[#3d3d3d] bg-clip-text text-transparent w-fit">
            {content.repeat(20)}
          </span>
        </div>
        <div className="flex shrink-0">
          <span className="flex font-inst text-7xl bg-gradient-to-b from-white via-[#c7c7c7] to-[#3d3d3d] bg-clip-text text-transparent w-fit">
            {content.repeat}
          </span>
        </div>
      </div>
    </div>
  );
};
