import type { Animated, PanResponderInstance } from "react-native";

export type Goal = {
  id: string;
  text: string;
  createdAt: string;
};

export type GoalsStore = {
  goals: Goal[];
  addGoal: (text: string) => void;
  deleteGoal: (id: string) => void;
  clearGoals: () => void;
};

export type SwipeAnimation = {
  translateX: Animated.Value;
  panResponder: PanResponderInstance;
};

export type DeleteAnimation = {
  containerX: Animated.Value;
  animateDelete: (goalId: string) => void;
};

export type UseSwipeAnimationProps = {
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
};
