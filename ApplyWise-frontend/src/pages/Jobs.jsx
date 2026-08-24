import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Jobs() {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchJobs();
  }, [page, keyword, sort]);

  const fetchJobs = async () => {
    try {
      const res = await api.get(
        `/jobs?keyword=${keyword}&sort=${sort}&page=${page}&size=6`
      );

      setJobs(res.data.content);
      setTotalJobs(res.data.totalElements);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const getCompanyInitial = (company) => {
    if (!company) return "C";

    return company
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">

      {/* Search + Sort */}
      <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search by job, company or skill..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="md:w-52 px-4 py-3 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
        >
          <option value="latest">Latest</option>
          <option value="salary_desc">Salary: High to Low</option>
          <option value="salary_asc">Salary: Low to High</option>
        </select>

      </div>


      {/* Page Heading */}
      <div className="mb-6">

        <h2 className="text-3xl font-bold text-gray-900">
          Available Jobs
        </h2>

        <p className="text-gray-500 mt-1">
          Find opportunities that match your skills and career goals.
        </p>

      </div>


      {/* Total Open Positions */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-7 flex items-center">

        <div className="w-11 h-11 rounded-lg bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-indigo-600 text-xl">
            💼
          </span>
        </div>

        <div>
          <p className="text-sm text-indigo-600 font-medium">
            Total Open Positions
          </p>

          <p className="text-2xl font-bold text-indigo-700 leading-tight">
            {totalJobs}
          </p>
        </div>

      </div>


      {/* No Jobs */}
      {jobs.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">

          <p className="text-gray-500 text-lg">
            No jobs available
          </p>

        </div>
      )}


      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[245px]"
          >

            {/* Job Title + Company */}
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 text-xl font-bold">
                  {getCompanyInitial(job.company)}
                </span>
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {job.title}
                </h3>

                <p className="text-indigo-600 font-medium mt-1">
                  {job.company}
                </p>

              </div>

            </div>


            {/* Location */}
            <div className="mt-5">

              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📍</span>
                <span>{job.location}</span>
              </div>

            </div>


            {/* Salary */}
            <div className="mt-4">

              <p className="text-lg font-bold text-green-600">
                ₹ {job.salary}
              </p>

            </div>


            {/* View Job */}
            <div className="mt-auto pt-4 border-t border-gray-100">

              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                View Job →
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium border border-gray-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>

          <span className="text-sm font-medium text-gray-600">
            Page{" "}
            <span className="text-gray-900">
              {page + 1}
            </span>{" "}
            of{" "}
            <span className="text-gray-900">
              {totalPages}
            </span>
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium border border-gray-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Jobs;