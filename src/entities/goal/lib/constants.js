import { Dimensions } from "react-native"

export const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const COLORS = {
  WHITE: "white",
  PURPLE: "#5e0acc",
  ORANGE: "orange",
  RED: "tomato",
  ANDROID_RIPPLE_COLOR: "rgba(255, 255, 255, 0.32)",
}

// Dynamic swipe configuration
export const ACTION_BUTTON_WIDTH = 80
export const ACTION_BUTTONS_COUNT = 1 // Edit + Delete (or just Delete for now)
export const MAX_SWIPE_DISTANCE = ACTION_BUTTON_WIDTH * ACTION_BUTTONS_COUNT
export const SWIPE_THRESHOLD = 20 // Minimum swipe to trigger open
export const OVERLAP_OFFSET = 8 // Overlay of the substrate to hide the gap
