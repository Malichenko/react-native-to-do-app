import { Text, StyleSheet } from 'react-native'
import { Modal } from '../../../shared/ui'
import { AddGoalForm } from '../../../features/goals'

export const AddGoalModal = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Header>
        <Text style={styles.modalTitle}>Add New Goal</Text>
      </Modal.Header>

      <Modal.Content>
        <AddGoalForm onSubmit={onSubmit} onClose={onClose} />
      </Modal.Content>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
})

