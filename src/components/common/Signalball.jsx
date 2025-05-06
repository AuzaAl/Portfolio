import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const Signalball = () => {
  const pulseRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pulseRef.current,
      { scale: 1, opacity: 0.6 },
      {
        scale: 3,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 0,
      }
    );
  }, []);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Core Ball */}
      <div className="w-6 h-6 bg-[#bbff00] rounded-full z-10" />

      {/* Looping Pulse */}
      <div
        ref={pulseRef}
        className="absolute w-6 h-6 bg-[#bbff00] rounded-full opacity-50"
      />
    </div>
  );
};
