import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaGamepad, FaCertificate, FaClipboardCheck, FaLanguage } from "react-icons/fa";
import modulesData from "../data/modulesData";

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
    <div className="bg-gray-50 min-h-screen pt-6 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
        Waste Management Training
      </h1>

      <div className="flex flex-col gap-5 max-w-5xl mx-auto">
        {modulesData.map((module, index) => (
          <div
            key={module.id}
            className="border rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            {/* Module Header */}
            <div
              className="p-5 cursor-pointer bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 rounded-t-xl flex justify-between items-center shadow-sm"
              onClick={() => toggleModule(index)}
            >
              <span className="text-lg md:text-xl font-semibold text-gray-800">
                {module.title}
              </span>
              <span className="text-gray-600 text-2xl">{openIndex === index ? "−" : "+"}</span>
            </div>

            {/* Module Sections */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="p-5 bg-white space-y-4">
                {module.sections.map((section, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(section.path)}
                    className="flex items-center p-4 border rounded-lg hover:shadow-md hover:bg-green-50 cursor-pointer transition duration-200"
                  >
                    <div className="text-green-600 text-2xl mr-4 bg-green-100 p-2 rounded-lg flex items-center justify-center">
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
    </div>
  );
}
