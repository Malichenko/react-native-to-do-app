import { Text, StyleSheet, Pressable, Animated } from 'react-native'
import { COLORS, ACTION_BUTTON_WIDTH, OVERLAP_OFFSET } from '../../../lib/constants'
import {
  createScaleInterpolation,
  createAnchorInterpolation,
  createOpacityInterpolation,
} from '../../../lib/utils/interpolations'

export const DeleteActionArea = ({ onDelete, translateX, maxWidth }) => {
  const scale = createScaleInterpolation(translateX, maxWidth)
  const translateAnchor = createAnchorInterpolation(translateX, maxWidth)
  const opacity = createOpacityInterpolation(translateX, maxWidth)

  return (
    <Animated.View
      style={[
        styles.actionsContainer,
        {
          width: maxWidth + OVERLAP_OFFSET,
          transform: [
            { translateX: translateAnchor },
            { scaleX: scale },
          ],
          opacity,
        },
      ]}
    >
      <Pressable style={styles.actionButton} onPress={onDelete}>
        <Text style={styles.actionText}>Delete</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: COLORS.RED,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ACTION_BUTTON_WIDTH,
    height: '100%',
  },

  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
})

