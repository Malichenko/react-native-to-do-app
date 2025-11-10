import { useState } from 'react'
import { useGoalsStore } from '../../../entities/goal'

export const useGoals = () => {
  const { goals, addGoal, deleteGoal, clearGoals } = useGoalsStore()
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  const handleOnAddGoal = (enteredGoalText) => {
    if (!enteredGoalText.trim()) return

    addGoal(enteredGoalText)
    closeModal()
  }

  return {
    goals,
    handleOnAddGoal,
    handleClearGoals: clearGoals,
    handleDeleteGoal: deleteGoal,
    modalVisible,
    openModal,
    closeModal,
  }
}