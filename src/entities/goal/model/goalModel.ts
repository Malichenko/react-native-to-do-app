import type { Goal } from "./types";
import { generateId } from "../../../shared/lib";

export const createGoal = (text: string): Goal => ({
  id: generateId(),
  text,
  createdAt: new Date().toISOString(),
});
