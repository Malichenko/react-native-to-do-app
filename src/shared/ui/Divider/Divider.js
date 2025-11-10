import { View, StyleSheet } from 'react-native'

export const Divider = ({ color = '#E0E0E0', thickness = 1, spacing = 8 }) => {
  return (
    <View
      style={[
        styles.divider,
        {
          height: thickness,
          backgroundColor: color,
          marginVertical: spacing,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
})

