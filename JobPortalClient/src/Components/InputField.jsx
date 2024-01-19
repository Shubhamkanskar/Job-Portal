import React from "react";

const InputField = ({ handlechange, value, title, name }) => {
  return (
    <label className="sidebar-label-container">
      <input type="radio" name={name} value={value} onChange={handlechange} />
      <span className="checkmark"></span>
      {title}
    </label>
  );
};

export default InputField;
