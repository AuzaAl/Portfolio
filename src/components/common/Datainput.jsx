import React from "react";

export const Datainput = ({title, value, onChange }) => {
  return (
    <div className=" flex flex-row w-full min-h-35 h-fit font-lex">
      <div className="w-1/3 h-full text-phantom-400">
        <label htmlFor={title} className="font-semibold p-1">{title}</label>
      </div>
      <div className="w-2/3 h-fit">
        <textarea required value={value} onChange={onChange} rows="4" placeholder="Type here..." id={title} name={title} className=" focus:ring-1 focus:ring-phantom-300 w-full min-h-35 h-full rounded-xl border-1 bg-[#ffffff0a] border-phantom-600 focus:outline-none p-2 text-[13px] text-phantom-300 shadow-lg"></textarea>
      </div>
    </div>
  );
};
