import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import modulesData from "../data/modulesData";
import { useProgress } from "../context/ProgressContent";

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const completeStep = useProgress();

  const moduleIndex = modulesData.findIndex((mod) => mod.id === moduleId);
  if (moduleIndex === -1)
    return <p className="p-6 text-center">Module not found!</p>;

  const module = modulesData[moduleIndex];

  // Dummy quiz questions
  const quizQuestions = [
    {
      question: "Which bin should a banana peel go into?",
      options: ["Wet", "Dry", "Hazardous"],
      correct: 0,
    },
    {
      question: "Glass bottles belong to which bin?",
      options: ["Wet", "Dry", "Hazardous"],
      correct: 1,
    },
    {
      question: "Where should batteries be disposed?",
      options: ["Wet", "Dry", "Hazardous"],
      correct: 2,
    },
  ];

  const [answers, setAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);

  // Load completed modules from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("completedModules")) || [];
    setCompletedModules(savedProgress);
  }, []);

  const handleOptionChange = (qIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);

    // ✅ Mark module as completed
    if (!completedModules.includes(moduleId)) {
      const updatedProgress = [...completedModules, moduleId];
      setCompletedModules(updatedProgress);
      localStorage.setItem("completedModules", JSON.stringify(updatedProgress));
    }

    const contentSection = module.sections.find((section) => section.type === "content");

  if (contentSection) {
    completeStep(contentSection.id); // ✅ correct ID directly from data
  }
  };

  const score = answers.reduce((acc, ans, idx) => {
    if (quizQuestions[idx].correct === ans) return acc + 1;
    return acc;
  }, 0);

  const handleNextModule = () => {
    const nextModule = modulesData[moduleIndex + 1];
    if (nextModule) {
      navigate(`/video/${nextModule.id}`);
    } else {
      alert("🎉 You have completed all modules!");
      navigate("/certificate"); // Redirect to certificate page when done
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {module.title} - Quiz
      </h1>

      {quizQuestions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 border rounded shadow">
          <p className="font-semibold mb-2">
            {qIndex + 1}. {q.question}
          </p>
          <div className="space-y-1">
            {q.options.map((opt, optIndex) => (
              <label
                key={optIndex}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={answers[qIndex] === optIndex}
                  onChange={() => handleOptionChange(qIndex, optIndex)}
                  disabled={submitted}
                  className="accent-blue-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {submitted && (
            <p
              className={`mt-2 font-semibold ${
                answers[qIndex] === q.correct ? "text-green-600" : "text-red-600"
              }`}
            >
              Correct answer: {q.options[q.correct]}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          onClick={() => navigate(`/content/${moduleId}`)}
        >
          ← Previous: Content
        </button>

        <div className="flex space-x-2">
          {!submitted ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() =>
                  alert(`You scored ${score} / ${quizQuestions.length}`)
                }
              >
                View Score
              </button>
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                onClick={handleNextModule}
              >
                {moduleIndex < modulesData.length - 1
                  ? "Next Module →"
                  : "Finish & Get Certificate 🎓"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
