import { useRef } from 'react'
import { Animated, PanResponder } from 'react-native'
import { MAX_SWIPE_DISTANCE, SWIPE_THRESHOLD } from '../lib/constants'
import {
  shouldCaptureSwipe,
  isHorizontalSwipe,
  isLeftSwipe,
  clampSwipeDistance,
  shouldOpenActions,
} from '../lib/utils/swipeHelpers'
import { noop } from '../../../shared/lib'

export const useSwipeAnimation = ({ onSwipeStart, onSwipeEnd }) => {
  const translateX = useRef(new Animated.Value(0)).current
  const isSwiped = useRef(false)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (_, gestureState) => {
        return shouldCaptureSwipe(gestureState)
      },

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return isHorizontalSwipe(gestureState)
      },

      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: () => {
        onSwipeStart?.()
      },

      onPanResponderMove: (_, gestureState) => {
        if (!isSwiped.current && isLeftSwipe(gestureState)) {
          const clampedValue = clampSwipeDistance(
            gestureState.dx,
            MAX_SWIPE_DISTANCE
          )
          translateX.setValue(clampedValue)
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        onSwipeEnd?.()

        if (shouldOpenActions(gestureState, SWIPE_THRESHOLD)) {
          Animated.spring(translateX, {
            toValue: -MAX_SWIPE_DISTANCE,
            useNativeDriver: true,
          }).start()
          isSwiped.current = true

          return noop()
        }

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
        isSwiped.current = false
      },

      onPanResponderTerminate: () => {
        onSwipeEnd?.()
      },
    })
  ).current

  return {
    translateX,
    panResponder,
  }
}

