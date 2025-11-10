import { generateId } from '../../../shared/lib'

export const createGoal = (text) => ({
  id: generateId(),
  text,
  createdAt: new Date().toISOString(),
})

