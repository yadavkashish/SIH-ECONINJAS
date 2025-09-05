import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import modulesData from "../data/modulesData";
import { useProgress } from "../context/ProgressContent";

export default function PledgePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeStep } = useProgress();
  const [pledged, setPledged] = useState(false);

  const moduleIndex = modulesData.findIndex((mod) => mod.id === moduleId);
  if (moduleIndex === -1)
    return <p className="p-6 text-center">Module not found!</p>;

  

  const module = modulesData[moduleIndex];

  const handleAcceptPledge = () => {
    setPledged(true);
    const contentSection = module.sections.find((section) => section.type === "content");

  if (contentSection) {
    completeStep(contentSection.id); // ✅ correct ID directly from data
  }
  };

  const handleContinue = () => {
    // Always go to final quiz after last pledge
    navigate("/quiz/final");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {module.title} - Pledge
      </h1>

      <div className="bg-yellow-50 p-6 rounded shadow border mb-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          📝 <strong>I pledge</strong> to segregate my waste daily, use the
          correct bins, and encourage others in my community to do the same. I
          will contribute towards a cleaner, greener, and healthier future. 🌍✨
        </p>
      </div>

      {!pledged ? (
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={handleAcceptPledge}
        >
          ✅ Accept Pledge
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-green-600 font-semibold">
            🎉 Thank you for taking the pledge!
          </p>
          <button
            onClick={handleContinue}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Continue to Final Quiz →
          </button>
        </div>
      )}
    </div>
  );
}
