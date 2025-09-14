// src/pages/FinalQuizPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContent";

export default function FinalQuizPage() {
  const navigate = useNavigate();
  const { completeStep } = useProgress();

  // Quiz questions
  const questions = [
    {
      question: "Which bin should you put a banana peel in?",
      options: ["Dry", "Wet", "Hazardous"],
      answer: "Wet",
    },
    {
      question: "True or False: Glass bottles can be composted.",
      options: ["True", "False"],
      answer: "False",
    },
    {
      question: "If you see a battery lying on the road, what is the best action?",
      options: [
        "Throw it in the nearest bin",
        "Give it to e-waste collection center",
        "Mix with household dry waste",
      ],
      answer: "Give it to e-waste collection center",
    },
    {
      question: "Which of these is NOT recyclable?",
      options: ["Newspaper", "Plastic bottle", "Used tissue paper"],
      answer: "Used tissue paper",
    },
    {
      question: "Minimum score required to pass this course?",
      options: ["50%", "60%", "70%"],
      answer: "70%",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let tempScore = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) tempScore++;
    });
    setScore(tempScore);
    setSubmitted(true);

    // ✅ Mark final quiz as completed
    completeStep("final-quiz");
  };

  const handleCertificate = () => {
    navigate("/certificate");
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const percentage = Math.round((score / questions.length) * 100);
  const passMark = 70;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🎓 Final Quiz
      </h1>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded shadow border space-y-3"
            >
              <p className="font-medium text-gray-800">
                {idx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={option}
                      checked={answers[idx] === option}
                      onChange={() => handleSelect(idx, option)}
                      className="accent-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Question {idx + 1} of {questions.length}
              </p>
            </div>
          ))}

          <button
            className={`px-6 py-2 rounded text-white transition ${
              allAnswered
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!allAnswered}
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="text-center bg-white p-6 rounded shadow">
          <p className="text-lg font-semibold mb-2">
            You scored {score} / {questions.length} ({percentage}%)
          </p>
          {percentage >= passMark ? (
            <div>
              <p className="text-green-600 mb-4 font-bold">
                🎉 Congratulations! You passed the course.
              </p>
              <button
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={handleCertificate}
              >
                Get Certificate →
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 mb-4 font-bold">
                ❌ You did not pass. Please try again.
              </p>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => setSubmitted(false)}
              >
                Retry Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
