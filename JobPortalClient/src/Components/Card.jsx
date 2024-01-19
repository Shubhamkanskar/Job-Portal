// Card.js
import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
    jobTitle,
  } = data;
  return (
    <section className="card mb-12 border rounded-lg">
      <Link
        to={`/job/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img src={companyLogo} alt="" />
        <div className="p-2">
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h4 className="text-lg font-semibold mb-2">{jobTitle}</h4>

          <div className="text-primary text-base flex flex-wrap gap-2 mb-2 ">
            <span className="flex items-center gap-2">
              <FiMapPin /> {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <FiDollarSign /> {minPrice}-{maxPrice}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar /> {postingDate}
            </span>
          </div>
          <p className="text-base text-primary/70">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
