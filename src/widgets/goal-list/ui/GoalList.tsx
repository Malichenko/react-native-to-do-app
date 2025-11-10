import { useMemo, useState } from "react";
import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import type { Goal } from "../../../entities/goal";
import { GoalItem } from "../../../entities/goal";

type GoalListProps = {
  goals: Goal[];
  onDelete: (id: string) => void;
};

export const GoalList = ({ goals, onDelete }: GoalListProps) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleSwipeStart = () => {
    setScrollEnabled(false);
  };

  const handleSwipeEnd = () => {
    setScrollEnabled(true);
  };
  const backgroundImage = useMemo(
    () => require("../../../shared/assets/todo-background.png"),
    []
  );

  return (
    <View style={styles.goalsContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        imageStyle={styles.image}
      >
        <FlatList<Goal>
          data={goals}
          renderItem={({ item }) => (
            <GoalItem
              goal={item}
              onDelete={onDelete}
              onSwipeStart={handleSwipeStart}
              onSwipeEnd={handleSwipeEnd}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={scrollEnabled}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  image: {
    opacity: 0.15,
  },
  listContent: {
    gap: 8,
    paddingHorizontal: 16,
  },
});
