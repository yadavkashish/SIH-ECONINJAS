import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import modulesData from "../data/modulesData";
import { useProgress } from "../context/ProgressContent";

export default function ActivityPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeStep } = useProgress();

  const moduleIndex = modulesData.findIndex((mod) => mod.id === moduleId);
  if (moduleIndex === -1)
    return <p className="p-6 text-center">Module not found!</p>;

  const module = modulesData[moduleIndex];

  // Game items
  const items = [
    { name: "Banana Peel", correctBin: "Wet" },
    { name: "Glass Bottle", correctBin: "Dry" },
    { name: "Battery", correctBin: "Hazardous" },
  ];

  const bins = ["Wet", "Dry", "Hazardous"];

  const [droppedItems, setDroppedItems] = useState({
    Wet: [],
    Dry: [],
    Hazardous: [],
  });

  const [draggingItem, setDraggingItem] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Handle drop
  const handleDrop = (bin) => {
    if (draggingItem) {
      setDroppedItems((prev) => ({
        ...prev,
        [bin]: [...prev[bin], draggingItem],
      }));
      setDraggingItem(null);
    }
  };

  // Check answers & update progress
  const handleCheck = () => {
    let tempScore = 0;
    bins.forEach((bin) => {
      droppedItems[bin].forEach((item) => {
        if (item.correctBin === bin) tempScore++;
      });
    });
    setScore(tempScore);
    setCompleted(true);
  };

  const handleNextModule = () => {
    const contentSection = module.sections.find((section) => section.type === "content");

  if (contentSection) {
    completeStep(contentSection.id); // ✅ correct ID directly from data
  }
    const nextModule = modulesData[moduleIndex + 1];
    if (nextModule) {
      navigate(`/video/${nextModule.id}`);
    } else {
      navigate("/certificate");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {module.title} - Activity
      </h1>

      <p className="mb-4">👉 Drag each item into the correct bin:</p>

      {/* Items to drag */}
      <div className="flex flex-wrap gap-3 mb-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => setDraggingItem(item)}
            className="px-3 py-2 bg-gray-200 rounded cursor-grab hover:bg-gray-300"
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Bins */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {bins.map((bin) => (
          <div
            key={bin}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(bin)}
            className="p-4 border-2 border-dashed rounded min-h-[120px] flex flex-col items-center justify-start"
          >
            <p className="font-semibold mb-2">{bin} Bin</p>
            <ul>
              {droppedItems[bin].map((item, idx) => (
                <li key={idx} className="text-sm">
                  ✅ {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Score & Navigation */}
      {completed && (
        <p className="mb-4 font-semibold text-green-600">
          Your Score: {score} / {items.length}
        </p>
      )}

      <div className="flex justify-between mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          onClick={() => navigate(`/content/${moduleId}/1`)}
        >
          ← Previous: Content
        </button>

        {!completed ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleCheck}
          >
            Submit Activity
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            onClick={handleNextModule}
          >
            {moduleIndex < modulesData.length - 1
              ? "Next Module →"
              : "Finish & Get Certificate 🎓"}
          </button>
        )}
      </div>
    </div>
  );
}
