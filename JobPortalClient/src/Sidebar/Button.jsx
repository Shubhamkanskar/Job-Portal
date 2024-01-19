import React from "react";

const Button = ({ onclickHandler, value, title }) => {
  return (
    <button
      onClick={onclickHandler}
      value={value}
      className={`px-4 py-1 border text-base hover:bg-blue hover:text-white`}
    >
      {title}
    </button>
  );
};

export default Button;
