import { useState } from "react";
import api from "../services/api";

function StatusUpdate({ applicationId, selectedAction, onClose }) {

const [message, setMessage] = useState("");
const [link, setLink] = useState("");
const [loading, setLoading] = useState(false);

const handleUpdate = async () => {
  try {
    setLoading(true);

    await api.put(`/applications/${applicationId}/status`, {
      status: selectedAction,
      message,
      assessmentLink: link
    });

    alert("Status updated & email sent");

    // ✅ PASS MESSAGE BACK
    onClose(message);

  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    console.error("STATUS:", err.response?.status);
    console.error("DATA:", err.response?.data);

    alert(
      err.response?.data?.message ||
      err.response?.data ||
      "Failed to update status"
    );
  } finally {
    setLoading(false);
  }
};

return ( <div className="mt-3 border p-3 rounded bg-gray-50">

  <h4 className="font-semibold mb-2">
    Job Seeker Communication
  </h4>

  <textarea
    required
    placeholder="Message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full mb-2 p-2 border rounded"
  />

  {selectedAction === "SHORTLISTED" && (
    <input
      type="text"
      placeholder="Optional assessment link..."
      value={link}
      onChange={(e) => setLink(e.target.value)}
      className="w-full mb-2 p-2 border rounded"
    />
  )}

  <div className="flex gap-2">
    <button
      onClick={handleUpdate}
      disabled={loading}
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      {loading ? "Updating..." : "Confirm"}
    </button>

    <button
      onClick={() => onClose(null)}
      className="bg-gray-400 text-white px-4 py-2 rounded"
    >
      Cancel
    </button>
  </div>

</div>

);
}

export default StatusUpdate;
