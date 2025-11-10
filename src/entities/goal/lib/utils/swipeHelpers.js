export const isHorizontalSwipe = (gestureState) => {
  return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
}

export const shouldCaptureSwipe = (gestureState, threshold = 5) => {
  return Math.abs(gestureState.dx) > threshold
}

export const clampSwipeDistance = (value, maxDistance) => {
  return Math.max(value, -maxDistance)
}

export const shouldOpenActions = (gestureState, threshold) => {
  return gestureState.dx < -threshold
}

export const isLeftSwipe = (gestureState) => {
  return gestureState.dx < 0
}

