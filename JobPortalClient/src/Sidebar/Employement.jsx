import React from "react";
import InputField from "../Components/InputField";

const Employement = ({ handlechange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of employment</h4>
      <div className="grid col-span-1 space-y-3">
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="all" onChange={handlechange} />
          <span className="checkmark"></span>Any experience
        </label>

        <InputField
          handlechange={handlechange}
          value="Full-time"
          title="Full-time"
          name="test"
        />
        <InputField
          handlechange={handlechange}
          value="Temporary"
          title="Temporary"
          name="test"
        />
        <InputField
          handlechange={handlechange}
          value="Part-time"
          title="Part-time"
          name="test"
        />
      </div>
    </div>
  );
};

export default Employement;
