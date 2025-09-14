// src/context/ProgressContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import modulesData from "../data/modulesData";

const ProgressContext = createContext();
export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("completedSteps")) || [];
    } catch {
      return [];
    }
  });

  // ✅ count all section IDs across all modules
  const allStepIds = modulesData.flatMap((mod) =>
    mod.sections ? mod.sections.map((s) => s.id) : []
  );
  const totalSteps = allStepIds.length;

  // persist progress
  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  // mark a step complete
  const completeStep = (stepId) => {
    if (!stepId) return;
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps((prev) => [...prev, stepId]);
    }
  };

  // reset progress completely
  const resetProgress = () => {
    setCompletedSteps([]);
    localStorage.removeItem("completedSteps");
  };

  // calculate progress percentage
  const progress = Math.min(
    100,
    Math.round((completedSteps.length / (totalSteps || 1)) * 100)
  );

  // debug missing steps
  useEffect(() => {
    console.log("✅ Total steps:", totalSteps);
    console.log("✅ Completed steps:", completedSteps.length);
    console.log(
      "❌ Missing steps:",
      allStepIds.filter((id) => !completedSteps.includes(id))
    );
  }, [completedSteps, totalSteps]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completedSteps,
        completeStep,
        resetProgress,
        totalSteps,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
