import React from "react";
import Button from "./Button";
import InputField from "../Components/InputField";

const Salary = ({ handlechange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="mb-4">
        <Button onclickHandler={handleClick} value="" title="Hourly" />
        <Button onclickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onclickHandler={handleClick} value="Yearly" title="Yearly" />
      </div>
      <div className="grid col-span-1 space-y-3">
        <label className="sidebar-label-container">
          <input type="radio" name="test2" value="all" />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handlechange={handlechange}
          value={30}
          title="<30000Rs"
          name="test2"
        />
        <InputField
          handlechange={handlechange}
          value={50}
          title="<50000Rs"
          name="test2"
        />
        <InputField
          handlechange={handlechange}
          value={80}
          title="<80000Rs"
          name="test2"
        />
        <InputField
          handlechange={handlechange}
          value={100}
          title="<100000Rs"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
