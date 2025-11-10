import { StyleSheet, View } from "react-native";
import { Button } from "../../../shared/ui";
import { GoalList } from "../../../widgets/goal-list";
import { AddGoalModal } from "../../../widgets/add-goal-modal";
import { useGoals } from "../model";

export const GoalsScreen = () => {
  const {
    goals,
    handleOnAddGoal,
    handleClearGoals,
    handleDeleteGoal,
    modalVisible,
    openModal,
    closeModal,
  } = useGoals();

  return (
    <View style={styles.goalsContainer}>
      <AddGoalModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={handleOnAddGoal}
      />

      <View style={styles.goalListContainer}>
        <GoalList goals={goals} onDelete={handleDeleteGoal} />
      </View>

      <View style={styles.buttonContainer}>
        <Button variant="primary" onPress={openModal}>
          Add New Goal
        </Button>

        <Button variant="danger" onPress={handleClearGoals}>
          Clear Goals
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 1,
  },
  goalListContainer: {
    backgroundColor: "white",
    paddingVertical: 16,
    flex: 6,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 60,
    gap: 4,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: -50,
  },
});
