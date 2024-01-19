import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingData from "./JobPostingData";
import WorkExperience from "./WorkExperience";
import Employement from "./Employement";

const Sidebar = ({ handlechange, handleClick }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Location handlechange={handlechange} />
      <Salary handlechange={handlechange} handleClick={handleClick} />
      <JobPostingData handlechange={handlechange} handleClick={handleClick} />
      <WorkExperience handlechange={handlechange} />
      <Employement handlechange={handlechange} />
    </div>
  );
};

export default Sidebar;
