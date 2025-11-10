import { useState } from "react";
import type { Goal, GoalsStore } from "./types";
import { createGoal } from "./goalModel";

export const useGoalsStore = (): GoalsStore => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (text: string) => {
    const newGoal = createGoal(text);
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const deleteGoal = (id: string) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const clearGoals = () => {
    setGoals([]);
  };

  return {
    goals,
    addGoal,
    deleteGoal,
    clearGoals,
  };
};
