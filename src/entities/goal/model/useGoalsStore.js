import { useState } from 'react'
import { createGoal } from './goalModel'

export const useGoalsStore = () => {
  const [goals, setGoals] = useState([])

  const addGoal = (text) => {
    const newGoal = createGoal(text)
    setGoals((prevGoals) => [...prevGoals, newGoal])
  }

  const deleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id))
  }

  const clearGoals = () => {
    setGoals([])
  }

  return {
    goals,
    addGoal,
    deleteGoal,
    clearGoals,
  }
}

