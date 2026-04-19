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
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${getColor(value)} h-3 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="mt-2 p-6 bg-gray-50 rounded-xl shadow-md border">
      <h3 className="text-xl font-bold mb-4 text-center">
        📊 Job Insights
      </h3>

      <ProgressBar label="Skill Match" value={data.skillCompatibility} />

      <ProgressBar label="Employer Response" value={data.employerResponsiveness} />

      <div className="mb-4">
        <p className="font-medium">
          Competition:{" "}
          <span className="font-semibold">
            {getCompetitionLabel(data.competitionIndex)}
          </span>{" "}
          ({data.applicantCount}{" "}
          {data.applicantCount === 1 ? "applicant" : "applicants"})
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">Overall Success Probability</p>
        <p className="text-3xl font-bold text-green-600">
          {data.successProbability.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default InsightBox;