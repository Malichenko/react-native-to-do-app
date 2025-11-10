import { Modal as RNModal, View, StyleSheet, Pressable } from 'react-native'

const ModalRoot = ({ children, visible, onClose }) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </Pressable>
    </RNModal>
  )
}

const Header = ({ children }) => (
  <View style={styles.header}>{children}</View>
)

const Content = ({ children }) => (
  <View style={styles.content}>{children}</View>
)

const Footer = ({ children }) => (
  <View style={styles.footer}>{children}</View>
)

export const Modal = Object.assign(ModalRoot, {
  Header,
  Content,
  Footer,
})

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
})

