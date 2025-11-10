type GestureState = {
  dx: number;
  dy: number;
};

export const isHorizontalSwipe = (gestureState: GestureState): boolean => {
  return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
};

export const shouldCaptureSwipe = (
  gestureState: GestureState,
  threshold = 5
): boolean => {
  return Math.abs(gestureState.dx) > threshold;
};

export const clampSwipeDistance = (
  value: number,
  maxDistance: number
): number => {
  return Math.max(value, -maxDistance);
};

export const shouldOpenActions = (
  gestureState: GestureState,
  threshold: number
): boolean => {
  return gestureState.dx < -threshold;
};

export const isLeftSwipe = (gestureState: GestureState): boolean => {
  return gestureState.dx < 0;
};
