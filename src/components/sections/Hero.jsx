import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";

const Hero = () => {
  const [hero, setHero] = useState("");

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    let { data: tblHero, error } = await supabase
      .from("tblHero")
      .select("*")
      .single();

    if (error) {
      console.error("eror ngefetch si hero", error);
    } else {
      setHero(tblHero);
    }
  }

  return (
    <>
      <section id="Hero" className="flex justify-center w-full h-screen max-w-[1440px]">
        <div className="w-full h-screen">
          <div className="sm:bg-amber-800 md:bg-amber-600 lg:bg-amber-400 xl:bg-amber-200 h-10"></div>
          <div className="flex items-center justify-center text-white h-screen">
            <div className="herotext absolute z-10 w-1/2  min-w-[20rem] max-w-[700px] p-10">
            <p className="font-inst text-[4.5rem]/15 text-center text-wrap bg-gradient-to-br from-white via-[#c7c7c7] to-[#3d3d3d] bg-clip-text text-transparent">
              {hero?.deskripsi ||
                "Hi, my name is Auza Alfarizi Ramadhan. I'm a web developer who loves building beautiful, responsive websites and exploring the depths of front-end development"}
            </p>
            </div>
            <img
              id="blackcircle"
              src="/assets/images/Buletan.svg"
              alt="blackcircle"
              className="w-3xl min-w-[20rem] relative"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
