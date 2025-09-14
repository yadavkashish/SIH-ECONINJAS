import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaGamepad, FaCertificate, FaClipboardCheck, FaLanguage } from "react-icons/fa";
import modulesData from "../data/modulesData"; // Import the JSON data

// Function to get icon based on type
const getIcon = (type) => {
  switch (type) {
    case "video":
      return <FaVideo />;
    case "content":
      return <FaFileAlt />;
    case "quiz":
      return <FaQuestionCircle />;
    case "activity":
      return <FaGamepad />;
    case "certificate":
      return <FaCertificate />;
    case "pledge":
      return <FaClipboardCheck />;
    case "feature":
      return <FaLanguage />;
    default:
      return <FaFileAlt />;
  }
};

export default function Modules() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleModule = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Waste Management Training
      </h1>

      {modulesData.map((module, index) => (
        <div
          key={module.id}
          className="mb-5 border rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          {/* Module Header */}
          <div
            className="p-5 cursor-pointer bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 rounded-t-lg flex justify-between items-center"
            onClick={() => toggleModule(index)}
          >
            <span className="text-xl font-semibold text-gray-800">
              {module.title}
            </span>
            <span className="text-gray-600 text-2xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          {/* Module Sections */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-5 bg-white space-y-3">
              {module.sections.map((section, i) => (
                <div
                  key={i}
                  onClick={() => navigate(section.path)}
                  className="flex items-center p-4 border rounded-lg hover:shadow-md cursor-pointer transition duration-200"
                >
                  <div className="text-green-500 text-2xl mr-4">
                    {getIcon(section.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">{section.name}</div>
                    {section.description && (
                      <div className="text-gray-500 text-sm">{section.description}</div>
                    )}
                  </div>
                  <span className="ml-auto text-blue-500 font-bold text-lg">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
