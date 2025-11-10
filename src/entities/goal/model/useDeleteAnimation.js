import { useRef } from 'react'
import { Animated } from 'react-native'
import { SCREEN_WIDTH } from '../lib/constants'

export const useDeleteAnimation = (onDelete) => {
  const containerX = useRef(new Animated.Value(0)).current

  const animateDelete = (goalId) => {
    Animated.timing(containerX, {
      toValue: -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onDelete(goalId))
  }

  return {
    containerX,
    animateDelete,
  }
}

