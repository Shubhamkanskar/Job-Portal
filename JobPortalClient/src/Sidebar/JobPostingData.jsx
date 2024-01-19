import React from "react";
import InputField from "../Components/InputField";

const JobPostingData = ({ handlechange }) => {
  const now = new Date();
  const twentyfourHourago = new Date(now - 24 * 60 * 60 * 1000);
  const Sevendaysago = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtydaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  //convert date to string
  const twentyfourHouragoDate = twentyfourHourago.toISOString().slice(0, 10);
  const SevenDayAgoDate = Sevendaysago.toISOString().slice(0, 10);
  const ThirtdaysAgoDate = thirtydaysAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of Posting </h4>
      <div className="grid col-span-1 space-y-3">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test3"
            value="all"
            onChange={handlechange}
          />
          <span className="checkmark"></span>All Time
        </label>

        <InputField
          handlechange={handlechange}
          value={twentyfourHouragoDate}
          title="Last 24 Hour"
          name="test3"
        />
        <InputField
          handlechange={handlechange}
          value={SevenDayAgoDate}
          title="Last 7 Days"
          name="test3"
        />
        <InputField
          handlechange={handlechange}
          value={ThirtdaysAgoDate}
          title="Last Month"
          name="test3"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
