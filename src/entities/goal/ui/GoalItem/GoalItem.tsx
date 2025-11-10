import { Text, StyleSheet, Animated } from "react-native";
import type { Goal } from "../../model/types";
import { COLORS, MAX_SWIPE_DISTANCE } from "../../lib/constants";
import { useSwipeAnimation, useDeleteAnimation } from "../../model";
import { DeleteActionArea } from "./components/DeleteActionArea";

type GoalItemProps = {
  goal: Goal;
  onDelete: (id: string) => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
};

export const GoalItem = ({
  goal,
  onDelete,
  onSwipeStart,
  onSwipeEnd,
}: GoalItemProps) => {
  const { translateX, panResponder } = useSwipeAnimation({
    onSwipeStart,
    onSwipeEnd,
  });
  const { containerX, animateDelete } = useDeleteAnimation(onDelete);

  const handleDelete = () => {
    animateDelete(goal.id);
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: containerX }] }]}
    >
      <DeleteActionArea
        onDelete={handleDelete}
        translateX={translateX}
        maxWidth={MAX_SWIPE_DISTANCE}
      />

      <Animated.View
        style={[styles.goalItem, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.goalItemText}>{goal.text}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  goalItem: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: COLORS.PURPLE,
    overflow: "hidden",
    zIndex: 1,
  },
  goalItemText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});
