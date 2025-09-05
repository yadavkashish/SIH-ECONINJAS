import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContent";
import modulesData from "../data/modulesData";

export default function VideoPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeStep } = useProgress();

  const moduleIndex = modulesData.findIndex((mod) => mod.id === moduleId);
  if (moduleIndex === -1)
    return <p className="p-6 text-center">Module not found!</p>;
  const module = modulesData[moduleIndex];

  const handleNext = () => {
    const contentSection = module.sections.find((section) => section.type === "content");

  if (contentSection) {
    completeStep(contentSection.id); // ✅ correct ID directly from data
  }
    navigate(`/content/${moduleId}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Video: {moduleId}</h1>
      <video width="100%" controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          ← Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
