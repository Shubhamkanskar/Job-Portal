import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UpdateJob = () => {
  const { id } = useParams();

  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    salaryType,
    skills,
  } = useLoaderData();

  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;

    fetch(`http://localhost:3000/update-job/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          alert("Successfully updated job");
        } else {
          alert("Error updating job");
        }
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
    { value: "React.js", label: "React.js" },
    { value: "MongoDb", label: "MongoDb" },
    { value: "Redux", label: "Redux" },
    { value: "Node", label: "Node" },
    { value: "HTML", label: "HTML" },
  ];

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 ">
        {/* Form*/}
        <div className="bg-[#FAFAFA] py-10px-4 lg:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* first Row */}
            <div className="flex flex-row lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Job Title</label>
                <input
                  type="text"
                  defaultValue={jobTitle}
                  {...register("jobTitle", { required: true })}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Company Name</label>
                <input
                  type="text"
                  placeholder="Ex:microsoft"
                  defaultValue={companyName}
                  {...register("companyName", { required: true })}
                  className="create-job-input"
                />
              </div>
            </div>
            {/* Second row */}
            <div className="flex flex-row lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Minimum Salary</label>
                <input
                  type="text"
                  placeholder={"20k"}
                  defaultValue={minPrice}
                  {...register("minPrice", { required: true })}
                  className="pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Maximum Salary</label>
                <input
                  type="text"
                  placeholder="120k"
                  defaultValue={maxPrice}
                  {...register("maxPrice", { required: true })}
                  className="pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* third row */}
            <div className="flex flex-row lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg"> Salary Type</label>
                <select
                  {...register("salaryType", { required: true })}
                  className="pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                >
                  <option value={salaryType}>{salaryType}</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Maximum Salary</label>
                <input
                  type="text"
                  placeholder="Ex: Pune"
                  defaultValue={jobLocation}
                  {...register("jobLocation", { required: true })}
                  className=" block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* 4th row */}
            <div className="flex flex-row lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Job Posting Date</label>
                <input
                  type="date"
                  placeholder="Ex :2024-01-01"
                  defaultValue={postingDate}
                  {...register("postingDate", { required: true })}
                  className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg"> Experience Level</label>
                <select
                  {...register("experienceLevel", { required: true })}
                  className="pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                >
                  <option value={experienceLevel}>{experienceLevel}</option>
                  <option value="Noexperience">No experience</option>
                  <option value="Internship">Internship</option>
                  <option value="Anyexperience">Any experience</option>
                  <option value="Work Remotely">Work-Remotely</option>
                </select>
              </div>
            </div>
            {/* 5th row  */}
            <div>
              <label className="block mb-2 text-lg"> Required skill Sets</label>
              <CreatableSelect
                defaultValue={skills}
                onChange={setSelectedOption}
                options={options}
                isMulti
                className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            {/* 6th row */}
            <div className="flex flex-row lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Company Logo</label>
                <input
                  type="url"
                  placeholder="Paste your company logo url:http://weshare.com/img1"
                  defaultValue={companyLogo}
                  {...register("companyLogo", { required: true })}
                  className="block w-full flex-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
              <div className="lg:w-1/2 w-full ">
                <label className="block mb-2 text-lg">Employment Type</label>
                <select
                  {...register("employmentType", { required: true })}
                  className="pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                >
                  <option value={employmentType}>{employmentType}</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Freelancer">Work-Remotely</option>
                </select>
              </div>
            </div>
            {/* 7th row  */}
            <div className="w-full">
              <label className="block mb-2 text-lg">Job Description</label>
              <textarea
                className="w-full pl-3 py-1.5 focus:outline-none"
                rows={6}
                defaultValue={description}
                placeholder="Job Description"
                {...register("description", { required: true })}
              ></textarea>
            </div>

            {/* last row */}
            <div>
              <label className="block mb-2 text-lg ">Job posted by</label>
              <input
                type="email"
                placeholder="your email address"
                defaultValue={postedBy}
                {...register("postedBy", { required: true })}
                className="pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <input
              type="submit"
              className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateJob;
