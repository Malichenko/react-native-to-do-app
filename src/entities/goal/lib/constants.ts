import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const COLORS = {
  WHITE: "white",
  PURPLE: "#5e0acc",
  ORANGE: "orange",
  RED: "tomato",
  ANDROID_RIPPLE_COLOR: "rgba(255, 255, 255, 0.32)",
} as const;

export const ACTION_BUTTON_WIDTH = 80;
export const ACTION_BUTTONS_COUNT = 1;
export const MAX_SWIPE_DISTANCE = ACTION_BUTTON_WIDTH * ACTION_BUTTONS_COUNT;
export const SWIPE_THRESHOLD = 20;
export const OVERLAP_OFFSET = 8;
