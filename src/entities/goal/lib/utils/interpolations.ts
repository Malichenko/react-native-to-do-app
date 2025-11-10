import type { Animated } from "react-native";
import { OVERLAP_OFFSET, SWIPE_THRESHOLD } from "../constants";

export const createScaleInterpolation = (
  translateX: Animated.Value,
  maxWidth: number
): Animated.AnimatedInterpolation<number> => {
  return translateX.interpolate({
    inputRange: [-maxWidth, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
};

export const createAnchorInterpolation = (
  translateX: Animated.Value,
  maxWidth: number
): Animated.AnimatedInterpolation<number> => {
  return translateX.interpolate({
    inputRange: [-maxWidth, 0],
    outputRange: [-OVERLAP_OFFSET / 2, maxWidth / 2],
    extrapolate: "clamp",
  });
};

export const createOpacityInterpolation = (
  translateX: Animated.Value,
  maxWidth: number
): Animated.AnimatedInterpolation<number> => {
  return translateX.interpolate({
    inputRange: [-maxWidth, -SWIPE_THRESHOLD, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });
};
