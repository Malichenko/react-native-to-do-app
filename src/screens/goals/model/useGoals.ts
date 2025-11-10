import { useState } from "react";
import type { Goal } from "@entities/goal";
import { useGoalsStore } from "@entities/goal";

type UseGoalsReturn = {
  goals: Goal[];
  handleOnAddGoal: (text: string) => void;
  handleClearGoals: () => void;
  handleDeleteGoal: (id: string) => void;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useGoals = (): UseGoalsReturn => {
  const { goals, addGoal, deleteGoal, clearGoals } = useGoalsStore();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleOnAddGoal = (enteredGoalText: string) => {
    if (!enteredGoalText.trim()) return;

    addGoal(enteredGoalText);
    closeModal();
  };

  return {
    goals,
    handleOnAddGoal,
    handleClearGoals: clearGoals,
    handleDeleteGoal: deleteGoal,
    modalVisible,
    openModal,
    closeModal,
  };
};
