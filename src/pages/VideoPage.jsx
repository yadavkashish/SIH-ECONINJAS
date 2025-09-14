import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContent";
import modulesData from "../data/modulesData";

export default function VideoPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeStep } = useProgress();

  // Find the module based on the route param
  const module = modulesData.find((mod) => mod.id === moduleId);
  if (!module) {
    return <p className="p-6 text-center">Module not found!</p>;
  }

  // Get the video section of this module
  const videoSection = module.sections.find((s) => s.type === "video");

  const handleNext = () => {
    const contentSection = module.sections.find(
      (section) => section.type === "content"
    );

    if (contentSection) {
      completeStep(contentSection.id); // mark step as complete
      navigate(contentSection.path);   // go to content page
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{module.title} - Video</h1>

      {videoSection?.videoUrl ? (
        <video width="100%" controls>
          <source src={videoSection.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <p className="text-center text-gray-500">
          No video available for this module.
        </p>
      )}

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
          disabled={!module.sections.find((s) => s.type === "content")}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
