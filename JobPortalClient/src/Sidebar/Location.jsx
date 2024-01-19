import React from "react";
import InputField from "../Components/InputField";

const Location = ({ handlechange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div className="grid col-span-1 space-y-3">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="location"
            value="all"
            onChange={handlechange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handlechange={handlechange}
          value="seattle"
          title="Seattle"
          name="location"
        />
        <InputField
          handlechange={handlechange}
          value="london"
          title="London"
          name="location"
        />
        <InputField
          handlechange={handlechange}
          value="madrid"
          title="Madrid"
          name="location"
        />
        <InputField
          handlechange={handlechange}
          value="boston"
          title="Boston"
          name="location"
        />
      </div>
    </div>
  );
};
export default Location;
