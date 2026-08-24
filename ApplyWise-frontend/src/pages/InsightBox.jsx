function InsightBox({ data }) {
  if (!data) return null;

  const getCompetitionLabel = (score) => {
    if (score >= 50) return "Low";
    if (score >= 20) return "Medium";
    return "High";
  };

  const getColor = (value) => {
    if (value > 70) return "bg-green-500";
    if (value > 40) return "bg-yellow-400";
    return "bg-red-500";
  };

  const ProgressBar = ({ label, value }) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">
          {label}
        </span>

        <span className="text-lg font-bold">
          {value.toFixed(1)}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${getColor(value)} h-full rounded-full transition-all`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );

  const matchedSkills = data.matchedSkills || [];
  const missingSkills = data.missingSkills || [];

  return (
    <div className="mt-6 p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200">

      {/* Existing Job Insights */}
      <h3 className="text-xl font-bold mb-4 text-center">
        📊 Job Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

        {/* Skill Match + Employer Response */}
        <div className="md:col-span-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-[155px] flex flex-col justify-center">

          <div className="space-y-5">
            <ProgressBar
              label="Skill Match"
              value={data.skillCompatibility}
            />

            <ProgressBar
              label="Employer Response"
              value={data.employerResponsiveness}
            />
          </div>

        </div>


        {/* Competition */}
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-[155px] flex items-center justify-center">

          <div className="flex flex-col items-center justify-center text-center">

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <span className="text-blue-600 text-lg leading-none">
                👥
              </span>
            </div>

            <p className="text-base text-gray-500 font-semibold">
              Competition
            </p>

            <p className="text-lg font-bold text-green-600 whitespace-nowrap">
              {getCompetitionLabel(data.competitionIndex)} ({data.applicantCount}{" "}
              {data.applicantCount === 1 ? "applicant" : "applicants"})
            </p>

          </div>

        </div>


        {/* Overall Success Probability */}
        <div className="md:col-span-4 bg-green-50 border-2 border-green-300 rounded-xl p-6 shadow-sm h-[155px] flex items-center justify-center">

          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mr-5 flex-shrink-0 shadow-sm">
            <span className="text-white text-xl leading-none">
              ★
            </span>
          </div>

          <div>
            <p className="text-base text-gray-600 font-semibold leading-tight">
              Overall Success
              <br />
              Probability
            </p>

            <p className="text-5xl font-bold text-green-600 leading-none mt-2">
              {data.successProbability.toFixed(2)}%
            </p>

            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              {data.successProbability >= 75
                ? "Good Chance"
                : data.successProbability >= 50
                ? "Fair Chance"
                : "Low Chance"}
            </span>
          </div>

        </div>

      </div>


      {/* AI Skill Insights */}
      <div className="mt-12 pt-6 border-t border-gray-300">

        <h4 className="text-base font-bold mb-4">
          🤖 AI Skill Insights
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Matched Skills */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 min-h-[120px]">

            <p className="font-semibold text-green-700 mb-2">
              ✓ Matching Skills ({matchedSkills.length})
            </p>

            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No matching skills found.
              </p>
            )}

          </div>


          {/* Missing Skills */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 min-h-[120px]">

            <p className="font-semibold text-red-700 mb-2">
              ⚠ Missing Skills ({missingSkills.length})
            </p>

            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-600">
                Great! No major missing skills identified.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default InsightBox;