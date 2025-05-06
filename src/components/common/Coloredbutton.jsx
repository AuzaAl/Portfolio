import React from "react";

const buttonVariants = {
    default: "bg-gradient-to-t from-[#4B4B4B] to-[#A2A2A2]",
    delete: "bg-gradient-to-t from-red-500 to-red-700",
    success: "bg-gradient-to-t from-[#8DFF9E] to-[#295F31]",
    edit : "bg-gradient-to-t from-[#162D5C] to-[#3C84FF]",
  };
  
  const innerVariants = {
    default: "bg-gradient-to-tl from-[#333333] to-[#818181]",
    delete: "bg-gradient-to-tl from-[#550000] to-[#aa3333]",
    edit : "bg-gradient-to-tl from-[#182154] to-[#334BAB]",
    success: "bg-gradient-to-tl from-[#27502D] to-[#51AF5F]",
  }
 const ColoredButton = ({Icon, text = "", variant = "default", ...props }) => {
  const outerClass = `
    min-w-fit text-white px-[1px] py-[1px] inline-flex items-center 
    rounded-md hover:cursor-pointer active:outline 
    ${buttonVariants[variant] || buttonVariants.default}
  `;

  const innerClass = `
    px-2 py-1 text-[0.8em] rounded-md flex flex-row items-center 
    font-lex font-regular 
    ${innerVariants[variant] || innerVariants.default}
  `;
  return (
    <button className={outerClass} {...props}>
      <div className={innerClass}>
        <Icon className="text-lg"/>
        <h1 className="font-regular">{text}</h1>
      </div>
    </button>
  );
};

export default ColoredButton;
