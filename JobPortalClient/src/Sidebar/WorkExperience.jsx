import React from "react";
import InputField from "../Components/InputField";

const WorkExperience = ({ handlechange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div className="grid col-span-1 space-y-3">
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="all" onChange={handlechange} />
          <span className="checkmark"></span>Any experience
        </label>

        <InputField
          handlechange={handlechange}
          value="Intership"
          title="Intership"
          name="test"
        />
        <InputField
          handlechange={handlechange}
          value="Work remotely"
          title="Work Remotely"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
