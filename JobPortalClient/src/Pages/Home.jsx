import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Job from "./Job";
import Sidebar from "../Sidebar/Sidebar";
import { data } from "autoprefixer";
import Newsletter from "../Components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, SetIsloading] = useState(true);
  const [currentPage, setCurrrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        SetIsloading(true);
        const response = await fetch("http://localhost:3000/all-jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // You might want to handle the error in a way that makes sense for your application (e.g., show an error message to the user).
      } finally {
        SetIsloading(false);
      }
    };

    fetchData();
  }, []);

  //handle input change
  const [query, setquery] = useState("");
  const handleInputchange = (event) => {
    setquery(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  /* radio filtering  */

  const handlechange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "all" ? "" : selectedValue);
  };

  // For the button-based "All" option
  const handleClick = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "all" ? "" : selectedValue);
  };

  //calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrrentPage(currentPage + 1);
    }
  };

  //function for the previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrrentPage(currentPage - 1);
    }
  };
  //main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering input item
    if (query) {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    // Category filtering
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          postingDate,
          employmentType,
        }) =>
          jobLocation?.toLowerCase() === selectedCategory?.toLowerCase() ||
          parseInt(maxPrice) === parseInt(selectedCategory) ||
          postingDate >= selectedCategory ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    //slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((job, i) => <Card key={i} data={job} log />);
  };
  const result = filteredData(jobs, setSelectedCategory, query);
  return (
    <>
      <div>
        <Banner query={query} handleInputchange={handleInputchange} />
        {/* main content */}
        <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 ">
          {/* left side */}
          <div className="bg-white p-4 rounded">
            <Sidebar handlechange={handlechange} handleClick={handleClick} />
          </div>

          {/* job card */}
          <div className="col-span-2 bg-white p-4 rounded">
            {isLoading ? (
              <p>Loading....</p>
            ) : result.length > 0 ? (
              <Job result={result} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                <p className="">No data found</p>
              </>
            )}

            {/* pagination  */}

            {result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className="hover:underline"
                >
                  previous
                </button>
                <span className="mx-2">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredItems.length / itemsPerPage)}
                </span>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                  }
                  className="hover:underline"
                >
                  next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* right side */}
          <div className="bg-white p-4 rounded">
            <Newsletter />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
