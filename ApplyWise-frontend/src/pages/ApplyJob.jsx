import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import InsightBox from "../pages/InsightBox";

function ApplyJob() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [insight, setInsight] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!file) {
      alert("Upload resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await api.post(`/applications/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Applied successfully");
      navigate("/my-applications");

    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const fetchInsights = async () => {
    if (!file) {
      alert("Please upload a resume first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post(`/applications/insights/${id}`, formData);
      setInsight(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Apply for Job
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={fetchInsights}
        disabled={loading}
        className="w-full mb-4 bg-blue-600 text-white py-2 rounded-lg"
      >
        {loading ? "Analyzing..." : "📊 Analyze Resume & Get Insights"}
      </button>

      <div className="mb-6">
        <InsightBox data={insight} />
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg"
      >
        Submit Application
      </button>
    </div>
  );
}

export default ApplyJob;