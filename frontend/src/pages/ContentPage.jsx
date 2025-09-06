import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContent";
import modulesData from "../data/modulesData";

export default function ContentPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeStep } = useProgress();

  const module = modulesData.find((mod) => mod.id === moduleId);
  if (!module) return <p className="p-6 text-center">Module not found!</p>;

 const handleNext = () => {
  const contentSection = module.sections.find((section) => section.type === "content");

  if (contentSection) {
    completeStep(contentSection.id); // ✅ correct ID directly from data
  }

  // find content section index
  const contentIndex = module.sections.findIndex(
    (section) => section.type === "content"
  );

  // get the next section (could be activity, pledge, quiz, etc.)
  const nextSection = module.sections[contentIndex + 1];

  if (nextSection) {
    navigate(nextSection.path); // ✅ go to the next section dynamically
  } else {
    // if no next section in this module, go to next module's first section
    const currentModuleIndex = modulesData.findIndex((m) => m.id === moduleId);
    const nextModule = modulesData[currentModuleIndex + 1];

    if (nextModule) {
      navigate(nextModule.sections[0].path);
    } else {
      navigate("/certificate");
    }
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Content: {module.title}</h1>

      <iframe
        src="https://arxiv.org/pdf/1706.03762.pdf"
        className="w-full h-[600px] border rounded mb-4"
        title="Content PDF"
      ></iframe>

      <a
        href="https://arxiv.org/pdf/1706.03762.pdf"
        download
        className="block mb-6 text-blue-600 underline"
      >
        Download PDF
      </a>

      <div className="flex justify-between">
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
