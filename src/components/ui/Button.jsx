import React from "react";

function Button({ text, action }) {
  return (
    <button
      onClick={action}
      className={`
        pb-1
        text-base md:text-lg 
        font-medium 
        transition-all duration-300 
        active:scale-95 
        hover:-translate-y-0.5
        text-(--primary-color)
        relative
        block
        group
      `}
    >
      {text}
      <div className="absolute right-0 bottom-0 w-[50%] group-hover:w-full transition-all duration-300 bg-(--primary-color) h-1 rounded-md"></div>
    </button>
  );
}

export default Button;
