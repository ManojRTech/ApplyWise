import { Link } from "react-router-dom";

function Home() {

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 to-white p-8">

      <h1 className="text-5xl font-bold text-indigo-700 mb-6">
        ApplyWise
      </h1>

      <p className="text-gray-600 text-center max-w-4xl mb-10">
        ApplyWise is a modern recruitment platform designed to bridge the gap between
        ambitious professionals and forward-thinking companies.  
        It goes beyond traditional job portals by allowing users to 
        <span className="font-semibold text-indigo-600"> analyze their resume and get insights </span> 
        before applying. By comparing your resume with job requirements, ApplyWise
        provides meaningful insights such as skill match, competition level,
        employer responsiveness, and success probability — helping you make smarter
        and more confident career decisions.
      </p>

      <div className="grid md:grid-cols-3 max-w-6xl gap-8 mt-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🚀 Smart Job Posting</h3>
          <p className="text-gray-600">
            <p className="text-gray-600">
              Post and manage job listings efficiently through a simple and intuitive dashboard,
              allowing employers to create job opportunities and monitor applications with ease.
            </p>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">📄 Analyze Resume & Get Insights</h3>
          <p className="text-gray-600">
            Upload your resume and instantly get insights like skill match,
            competition level, employer responsiveness, and success probability
            before applying.

          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">📊 Application Management</h3>
          <p className="text-gray-600">
            Employers can review, shortlist, and manage candidates seamlessly, while
            job seekers can apply easily and track their application status in real time.
          </p>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="flex pt-10 gap-6 justify-center mt-10">

          <Link
            to="/login"
            className="px-8 py-4 text-lg font-semibold rounded-2xl bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-md hover:shadow-xl transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-4 text-lg font-semibold rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-xl transition-all duration-300"
          >
            Register
          </Link>

        </div>
      )}

    </div>
  );
}

export default Home;