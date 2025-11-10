import { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Button } from '../../../../shared/ui'

export const AddGoalForm = ({ onSubmit, onClose }) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleOnPress = () => {
    onSubmit(inputValue)
    setInputValue('')
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={setInputValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What do you want to achieve?"
        placeholderTextColor="#9ca3af"
        style={[styles.textInput, isFocused && styles.textInputFocused]}
        value={inputValue}
        autoFocus
      />

      <View style={styles.buttonContainer}>
        <Button variant="secondary" onPress={onClose}>
          Cancel
        </Button>

        <Button variant="primary" onPress={handleOnPress}>
          Add Goal
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 20,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    fontSize: 16,
    color: '#1f2937',
  },
  textInputFocused: {
    borderColor: '#6366f1',
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
})

