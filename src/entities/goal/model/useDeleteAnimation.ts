import { useRef } from "react";
import { Animated } from "react-native";
import type { DeleteAnimation } from "./types";
import { SCREEN_WIDTH } from "../lib/constants";

export const useDeleteAnimation = (
  onDelete: (id: string) => void
): DeleteAnimation => {
  const containerX = useRef(new Animated.Value(0)).current;

  const animateDelete = (goalId: string) => {
    Animated.timing(containerX, {
      toValue: -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onDelete(goalId));
  };

  return {
    containerX,
    animateDelete,
  };
};
