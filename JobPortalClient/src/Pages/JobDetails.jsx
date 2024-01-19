import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../Components/PageHeader";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({}); // Initialize with an empty object

  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Update the state with the fetched job details
        setJob(data);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  }, [id]);
  const truncatedJobId = id.slice(0, 5);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });

    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Single Job Page"} path={"Single-Job"} />
      <h3 className="text-center font-semibold">Job ID: {truncatedJobId}</h3>
      <h2 className="text-blue text-center mt-3 font-bold">
        Job Detail{" "}
        <p className="text-base text-gray-300 mt-10 mb-10">
          {" "}
          {job.description}
        </p>
      </h2>
      <h1 className="text-center font-extrabold text-[#042d75] ">
        {job.jobTitle}
      </h1>
      <div className="flex justify-center items-center gap-2 mt-5">
        <button className="bg-[#042d75] px-8 py-2 text-white m-2 rounded">
          {job.employmentType}
        </button>
        <button
          className="bg-blue px-8 py-2 text-white rounded"
          onClick={handleApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
